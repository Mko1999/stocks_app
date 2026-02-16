'use client';

import { useEffect, useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Loader2, TrendingUp, Star } from 'lucide-react';
import Link from 'next/link';
import { searchStocks } from '@/lib/actions/finnhub.actions';
import { useDebounce } from '@/hooks/useDebounce';
import {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlistSymbolsByEmail,
} from '@/lib/actions/watchlist.actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function SearchCommand({
  renderAs = 'button',
  label = 'Add stock',
  initialStocks,
  onNavClick,
  userEmail,
}: SearchCommandProps & { onNavClick?: () => void; userEmail?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] =
    useState<StockWithWatchlistStatus[]>(initialStocks);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [watchlistSymbols, setWatchlistSymbols] = useState<string[]>([]);

  const isSearchMode = !!searchTerm.trim();
  const displayStocks = isSearchMode ? stocks : stocks?.slice(0, 10);

  useEffect(() => {
    const loadWatchlistStatus = async () => {
      if (userEmail) {
        const symbols = await getWatchlistSymbolsByEmail(userEmail);
        setWatchlistSymbols(symbols);
        setStocks((prev) =>
          prev?.map((stock) => ({
            ...stock,
            isInWatchlist: symbols.includes(stock.symbol.toUpperCase()),
          }))
        );
      }
    };
    loadWatchlistStatus();
  }, [userEmail]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleSearch = async () => {
    if (!isSearchMode) return setStocks(initialStocks);

    setLoading(true);
    try {
      const results = await searchStocks(searchTerm.trim());
      const symbols = userEmail
        ? await getWatchlistSymbolsByEmail(userEmail)
        : [];
      const enrichedResults = results.map((stock) => ({
        ...stock,
        isInWatchlist: symbols.includes(stock.symbol.toUpperCase()),
      }));
      setStocks(enrichedResults);
      setWatchlistSymbols(symbols);
    } catch {
      setStocks([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebounce(handleSearch, 300);

  useEffect(() => {
    debouncedSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleSelectStock = () => {
    setOpen(false);
    setSearchTerm('');
    setStocks(initialStocks);
    onNavClick?.();
  };

  const handleToggleWatchlist = async (
    e: React.MouseEvent,
    stock: StockWithWatchlistStatus
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userEmail) {
      toast.error('Please sign in to manage watchlist');
      return;
    }

    const isInWatchlist = stock.isInWatchlist;

    try {
      const result = isInWatchlist
        ? await removeFromWatchlist(userEmail, stock.symbol)
        : await addToWatchlist(userEmail, stock.symbol, stock.name);

      if (result.success) {
        toast.success(
          isInWatchlist ? 'Removed from watchlist' : 'Added to watchlist'
        );
        setStocks((prev) =>
          prev?.map((s) =>
            s.symbol === stock.symbol
              ? { ...s, isInWatchlist: !isInWatchlist }
              : s
          )
        );
        setWatchlistSymbols((prev) => {
          if (isInWatchlist) {
            return prev.filter((sym) => sym !== stock.symbol.toUpperCase());
          } else {
            return [...prev, stock.symbol.toUpperCase()];
          }
        });
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to update watchlist');
      }
    } catch {
      toast.error('An error occurred');
    }
  };

  return (
    <>
      {renderAs === 'text' ? (
        <span onClick={() => setOpen(true)} className="search-text">
          {label}
        </span>
      ) : (
        <Button onClick={() => setOpen(true)} className="search-btn">
          {label}
        </Button>
      )}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="search-dialog"
      >
        <div className="search-field">
          <CommandInput
            value={searchTerm}
            onValueChange={setSearchTerm}
            placeholder="Search stocks..."
            className="search-input"
          />
          {loading && <Loader2 className="search-loader" />}
        </div>
        <CommandList className="search-list">
          {loading ? (
            <CommandEmpty className="search-list-empty">
              Loading stocks...
            </CommandEmpty>
          ) : displayStocks?.length === 0 ? (
            <div className="search-list-indicator">
              {isSearchMode ? 'No results found' : 'No stocks available'}
            </div>
          ) : (
            <ul>
              <div className="search-count">
                {isSearchMode ? 'Search results' : 'Popular stocks'}
                {` `}({displayStocks?.length || 0})
              </div>
              {displayStocks?.map((stock) => (
                <li key={stock.symbol} className="search-item">
                  <Link
                    href={`/stocks/${stock.symbol}`}
                    onClick={handleSelectStock}
                    className="search-item-link"
                  >
                    <TrendingUp className="h-4 w-4 text-gray-500" />
                    <div className="flex-1">
                      <div className="search-item-name">{stock.name}</div>
                      <div className="text-sm text-gray-500">
                        {stock.symbol} | {stock.exchange} | {stock.type}
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleToggleWatchlist(e, stock)}
                      className={`ml-2 p-1 hover:opacity-80 transition-opacity ${
                        stock.isInWatchlist
                          ? 'text-yellow-500'
                          : 'text-gray-500'
                      }`}
                      aria-label={
                        stock.isInWatchlist
                          ? 'Remove from watchlist'
                          : 'Add to watchlist'
                      }
                    >
                      <Star
                        className={`h-4 w-4 ${
                          stock.isInWatchlist ? 'fill-current' : ''
                        }`}
                      />
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
