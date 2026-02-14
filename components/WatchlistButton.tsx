'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  addToWatchlist,
  removeFromWatchlist,
} from '@/lib/actions/watchlist.actions';
import { Star, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type WatchlistButtonProps = {
  symbol: string;
  company: string;
  isInWatchlist: boolean;
  userEmail: string;
  showTrashIcon?: boolean;
  type?: 'button' | 'icon';
  onWatchlistChange?: (symbol: string, isAdded: boolean) => void;
};

const WatchlistButton = ({
  symbol,
  company,
  isInWatchlist: initialIsInWatchlist,
  userEmail,
  showTrashIcon = false,
  type = 'button',
  onWatchlistChange,
}: WatchlistButtonProps) => {
  const [isInWatchlist, setIsInWatchlist] = useState(initialIsInWatchlist);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      if (isInWatchlist) {
        const result = await removeFromWatchlist(userEmail, symbol);
        if (result.success) {
          setIsInWatchlist(false);
          onWatchlistChange?.(symbol, false);
          toast.success('Removed from watchlist');
        } else {
          toast.error(result.error || 'Failed to remove from watchlist');
        }
      } else {
        const result = await addToWatchlist(userEmail, symbol, company);
        if (result.success) {
          setIsInWatchlist(true);
          onWatchlistChange?.(symbol, true);
          toast.success('Added to watchlist');
        } else {
          toast.error(result.error || 'Failed to add to watchlist');
        }
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (type === 'icon') {
    return (
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={`watchlist-icon-btn ${isInWatchlist ? 'watchlist-icon-added' : ''}`}
        aria-label={
          isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'
        }
      >
        <div className="watchlist-icon">
          {showTrashIcon && isInWatchlist ? (
            <Trash2 className="trash-icon" />
          ) : (
            <Star
              className={`star-icon ${isInWatchlist ? 'text-yellow-500' : ''}`}
            />
          )}
        </div>
      </button>
    );
  }

  return (
    <Button
      onClick={handleToggle}
      disabled={isLoading}
      className={`watchlist-btn ${isInWatchlist && showTrashIcon ? 'watchlist-remove' : ''}`}
    >
      {isLoading ? (
        'Loading...'
      ) : isInWatchlist ? (
        showTrashIcon ? (
          <>
            <Trash2 className="mr-2 h-4 w-4" />
            Remove from Watchlist
          </>
        ) : (
          'In Watchlist'
        )
      ) : (
        <>
          <Star className="mr-2 h-4 w-4" />
          Add to Watchlist
        </>
      )}
    </Button>
  );
};

export default WatchlistButton;
