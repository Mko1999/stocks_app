'use server';

import { getDateRange, validateArticle, formatArticle } from '@/lib/utils';

const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';
const NEXT_PUBLIC_FINNHUB_API_KEY =
  process.env.NEXT_PUBLIC_FINNHUB_API_KEY ?? '';

async function fetchJSON<T>(
  url: string,
  revalidateSeconds?: number
): Promise<T> {
  const options: RequestInit & { next?: { revalidate?: number } } =
    revalidateSeconds
      ? { cache: 'force-cache', next: { revalidate: revalidateSeconds } }
      : { cache: 'no-store' };

  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Fetch failed ${res.status}: ${text}`);
  }
  return (await res.json()) as T;
}

export { fetchJSON };

export async function getNews(
  symbols?: string[]
): Promise<MarketNewsArticle[]> {
  try {
    const range = getDateRange(5);
    const token = process.env.FINNHUB_API_KEY ?? NEXT_PUBLIC_FINNHUB_API_KEY;
    if (!token) {
      throw new Error('FINNHUB API key is not configured');
    }
    const cleanSymbols = (symbols || [])
      .map((s) => s?.trim().toUpperCase())
      .filter((s): s is string => Boolean(s));

    const maxArticles = 6;

    // If we have symbols, try to fetch company news per symbol and round-robin select
    if (cleanSymbols.length > 0) {
      const perSymbolArticles: Record<string, RawNewsArticle[]> = {};

      await Promise.all(
        cleanSymbols.map(async (sym) => {
          try {
            const url = `${FINNHUB_BASE_URL}/company-news?symbol=${encodeURIComponent(sym)}&from=${range.from}&to=${range.to}&token=${token}`;
            const articles = await fetchJSON<RawNewsArticle[]>(url, 300);
            perSymbolArticles[sym] = (articles || []).filter(validateArticle);
          } catch (e) {
            console.error('Error fetching company news for', sym, e);
            perSymbolArticles[sym] = [];
          }
        })
      );

      const collected: MarketNewsArticle[] = [];
      // Round-robin up to 6 picks
      for (let round = 0; round < maxArticles; round++) {
        for (let i = 0; i < cleanSymbols.length; i++) {
          const sym = cleanSymbols[i];
          const list = perSymbolArticles[sym] || [];
          if (list.length === 0) continue;
          const article = list.shift();
          if (!article || !validateArticle(article)) continue;
          collected.push(formatArticle(article, true, sym, round));
          if (collected.length >= maxArticles) break;
        }
        if (collected.length >= maxArticles) break;
      }

      if (collected.length > 0) {
        // Sort by datetime desc
        collected.sort((a, b) => (b.datetime || 0) - (a.datetime || 0));
        return collected.slice(0, maxArticles);
      }
      // If none collected, fall through to general news
    }

    // General market news fallback or when no symbols provided
    const generalUrl = `${FINNHUB_BASE_URL}/news?category=general&token=${token}`;
    const general = await fetchJSON<RawNewsArticle[]>(generalUrl, 300);

    const seen = new Set<string>();
    const unique: RawNewsArticle[] = [];
    for (const art of general || []) {
      if (!validateArticle(art)) continue;
      const key = `${art.id}-${art.url}-${art.headline}`;
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(art);
      if (unique.length >= 20) break; // cap early before final slicing
    }

    const formatted = unique
      .slice(0, maxArticles)
      .map((a, idx) => formatArticle(a, false, undefined, idx));
    return formatted;
  } catch (err) {
    console.error('getNews error:', err);
    throw new Error('Failed to fetch news');
  }
}

export async function searchStocks(
  query: string
): Promise<StockWithWatchlistStatus[]> {
  try {
    const token = process.env.FINNHUB_API_KEY ?? NEXT_PUBLIC_FINNHUB_API_KEY;

    if (!token) {
      throw new Error('FINNHUB API key is not configured');
    }

    const cleanQuery = query.trim();
    if (!cleanQuery) {
      return [];
    }

    const url = `${FINNHUB_BASE_URL}/search?q=${encodeURIComponent(cleanQuery)}&token=${token}`;
    const response = await fetchJSON<FinnhubSearchResponse>(url);

    if (!response.result || response.result.length === 0) {
      return [];
    }

    // Filter and transform results
    const stocks: StockWithWatchlistStatus[] = response.result
      .filter((item) => item.symbol && item.description)
      .map((item) => ({
        symbol: item.symbol,
        name: item.description,
        displaySymbol: item.displaySymbol,
        type: item.type,
        exchange: extractExchange(item.symbol),
        isInWatchlist: false, // Default, can be enriched later
      }));

    return stocks;
  } catch (err) {
    console.error('searchStocks error:', err);
    return [];
  }
}

function extractExchange(symbol: string): string {
  if (symbol.includes('.')) {
    const parts = symbol.split('.');
    return parts[parts.length - 1] || 'US';
  }
  return 'US';
}

export async function getStockQuote(
  symbol: string
): Promise<{ price: number; changePercent: number } | null> {
  try {
    const token = process.env.FINNHUB_API_KEY ?? NEXT_PUBLIC_FINNHUB_API_KEY;
    if (!token) {
      return null;
    }

    const url = `${FINNHUB_BASE_URL}/quote?symbol=${encodeURIComponent(symbol.toUpperCase())}&token=${token}`;
    const quote = await fetchJSON<QuoteData>(url, 60);

    if (quote.c && quote.dp !== undefined) {
      return {
        price: quote.c,
        changePercent: quote.dp,
      };
    }
    return null;
  } catch (err) {
    console.error('Error fetching quote for', symbol, err);
    return null;
  }
}

export async function getStockProfile(
  symbol: string
): Promise<{ marketCap: number } | null> {
  try {
    const token = process.env.FINNHUB_API_KEY ?? NEXT_PUBLIC_FINNHUB_API_KEY;
    if (!token) {
      return null;
    }

    const url = `${FINNHUB_BASE_URL}/stock/profile2?symbol=${encodeURIComponent(symbol.toUpperCase())}&token=${token}`;
    const profile = await fetchJSON<ProfileData>(url, 3600);

    if (profile.marketCapitalization) {
      return {
        marketCap: profile.marketCapitalization,
      };
    }
    return null;
  } catch (err) {
    console.error('Error fetching profile for', symbol, err);
    return null;
  }
}

export async function getStockMetrics(
  symbol: string
): Promise<{ peRatio: number | null }> {
  try {
    const token = process.env.FINNHUB_API_KEY ?? NEXT_PUBLIC_FINNHUB_API_KEY;
    if (!token) {
      return { peRatio: null };
    }

    const url = `${FINNHUB_BASE_URL}/stock/metric?symbol=${encodeURIComponent(symbol.toUpperCase())}&metric=all&token=${token}`;
    const metrics = await fetchJSON<FinancialsData>(url, 3600);

    if (metrics.metric && typeof metrics.metric.peRatioTTM === 'number') {
      return {
        peRatio: metrics.metric.peRatioTTM,
      };
    }
    return { peRatio: null };
  } catch (err) {
    console.error('Error fetching metrics for', symbol, err);
    return { peRatio: null };
  }
}

export async function getWatchlistStockData(symbols: string[]): Promise<
  Record<
    string,
    {
      price: number | null;
      changePercent: number | null;
      marketCap: number | null;
      peRatio: number | null;
    }
  >
> {
  const result: Record<
    string,
    {
      price: number | null;
      changePercent: number | null;
      marketCap: number | null;
      peRatio: number | null;
    }
  > = {};

  await Promise.all(
    symbols.map(async (symbol) => {
      const [quote, profile, metrics] = await Promise.all([
        getStockQuote(symbol),
        getStockProfile(symbol),
        getStockMetrics(symbol),
      ]);

      result[symbol.toUpperCase()] = {
        price: quote?.price ?? null,
        changePercent: quote?.changePercent ?? null,
        marketCap: profile?.marketCap ?? null,
        peRatio: metrics?.peRatio ?? null,
      };
    })
  );

  return result;
}
