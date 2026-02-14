import TradingViewWidget from '@/components/TradingViewWidget';
import WatchlistButton from '@/components/WatchlistButton';
import {
  SYMBOL_INFO_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  BASELINE_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
} from '@/lib/constants';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';
import { getWatchlistSymbolsByEmail } from '@/lib/actions/watchlist.actions';

const MAIN_URL = 'https://s3.tradingview.com/external-embedding/embed-widget';

const SYMBOL_INFO_URL = `${MAIN_URL}-symbol-info.js`;
const ADVANCED_CHART_URL = `${MAIN_URL}-advanced-chart.js`;
const TECHNICAL_ANALYSIS_URL = `${MAIN_URL}-technical-analysis.js`;
const COMPANY_PROFILE_URL = `${MAIN_URL}-company-profile.js`;
const COMPANY_FINANCIALS_URL = `${MAIN_URL}-company-financials.js`;

type StockDetailsPageProps = {
  params: Promise<{
    symbol: string;
  }>;
};

const StockDetails = async ({ params }: StockDetailsPageProps) => {
  const { symbol } = await params;
  const session = await auth?.api.getSession({
    headers: await headers(),
  });

  const userEmail = session?.user?.email || '';
  const watchlistSymbols = await getWatchlistSymbolsByEmail(userEmail);
  const isInWatchlist = watchlistSymbols.includes(symbol.toUpperCase());

  // Use symbol as company name fallback - can be enhanced later with API call
  const company = symbol.toUpperCase();

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <section className="space-y-6">
          <TradingViewWidget
            scriptUrl={SYMBOL_INFO_URL}
            config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
            height={170}
          />
          <TradingViewWidget
            scriptUrl={ADVANCED_CHART_URL}
            config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
            height={600}
          />
          <TradingViewWidget
            scriptUrl={ADVANCED_CHART_URL}
            config={BASELINE_WIDGET_CONFIG(symbol)}
            height={600}
          />
        </section>

        {/* Right Column */}
        <section className="space-y-6">
          <WatchlistButton
            symbol={symbol}
            company={company}
            isInWatchlist={isInWatchlist}
            userEmail={userEmail}
            type="button"
          />
          <TradingViewWidget
            scriptUrl={TECHNICAL_ANALYSIS_URL}
            config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
            height={400}
          />
          <TradingViewWidget
            scriptUrl={COMPANY_PROFILE_URL}
            config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
            height={440}
          />
          <TradingViewWidget
            scriptUrl={COMPANY_FINANCIALS_URL}
            config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
            height={464}
          />
        </section>
      </div>
    </div>
  );
};

export default StockDetails;
