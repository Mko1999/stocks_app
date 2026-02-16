import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';
import { getWatchlistByEmail } from '@/lib/actions/watchlist.actions';
import { getAlertsByEmail } from '@/lib/actions/alert.actions';
import { getWatchlistStockData } from '@/lib/actions/finnhub.actions';
import WatchlistTable from '@/components/WatchlistTable';

const WatchlistPage = async () => {
  const session = await auth?.api.getSession({
    headers: await headers(),
  });

  const userEmail = session?.user?.email || '';
  const watchlist = await getWatchlistByEmail(userEmail);
  const alerts = await getAlertsByEmail(userEmail);

  const symbols = watchlist.map((item) => item.symbol);
  const stockData = await getWatchlistStockData(symbols);

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-100 mb-2">Watchlist</h1>
        <p className="text-gray-400">
          {watchlist.length === 0
            ? 'Your watchlist is empty. Add stocks to track them here.'
            : `You are tracking ${watchlist.length} stock${watchlist.length > 1 ? 's' : ''}.`}
        </p>
      </div>
      {watchlist.length > 0 && (
        <WatchlistTable
          watchlist={watchlist}
          alerts={alerts}
          userEmail={userEmail}
          stockData={stockData}
        />
      )}
    </div>
  );
};

export default WatchlistPage;
