'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { WATCHLIST_TABLE_HEADER } from '@/lib/constants';
import AlertModal from './AlertModal';
import { removeFromWatchlist } from '@/lib/actions/watchlist.actions';
import { deleteAlert } from '@/lib/actions/alert.actions';
import {
  getAlertText,
  formatPrice,
  formatChangePercent,
  formatMarketCapValue,
  getChangeColorClass,
} from '@/lib/utils';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Trash2, Bell } from 'lucide-react';
import ConfirmModal from './ConfirmModal';

export default function WatchlistTable({
  watchlist,
  alerts,
  userEmail,
  stockData,
}: {
  watchlist: Array<{ symbol: string; company: string; addedAt: Date }>;
  alerts: Array<{
    id: string;
    symbol: string;
    company: string;
    alertName: string;
    alertType: 'upper' | 'lower';
    threshold: number;
    createdAt: Date;
  }>;
  userEmail: string;
  stockData: Record<
    string,
    {
      price: number | null;
      changePercent: number | null;
      marketCap: number | null;
    }
  >;
}) {
  const router = useRouter();
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<{
    symbol: string;
    company: string;
  } | null>(null);
  const [stockToRemove, setStockToRemove] = useState<{
    symbol: string;
    company: string;
  } | null>(null);

  const handleAddAlert = (symbol: string, company: string) => {
    setSelectedStock({ symbol, company });
    setAlertModalOpen(true);
  };

  const handleRemoveClick = (symbol: string, company: string) => {
    setStockToRemove({ symbol, company });
    setConfirmModalOpen(true);
  };

  const handleRemoveFromWatchlist = async () => {
    if (!stockToRemove) return;

    try {
      const result = await removeFromWatchlist(userEmail, stockToRemove.symbol);
      if (result.success) {
        toast.success('Removed from watchlist');
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to remove from watchlist');
      }
    } catch {
      toast.error('An error occurred');
    }
  };

  const handleDeleteAlert = async (alertId: string) => {
    try {
      const result = await deleteAlert(userEmail, alertId);
      if (result.success) {
        toast.success('Alert deleted');
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to delete alert');
      }
    } catch {
      toast.error('An error occurred');
    }
  };

  const getAlertsForSymbol = (symbol: string) => {
    return alerts.filter((alert) => alert.symbol === symbol.toUpperCase());
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {WATCHLIST_TABLE_HEADER.map((header) => (
              <TableHead key={header} className="text-left">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchlist.map((row) => {
            const symbolAlerts = getAlertsForSymbol(row.symbol);
            const data = stockData[row.symbol.toUpperCase()] || {
              price: null,
              changePercent: null,
              marketCap: null,
            };
            return (
              <TableRow key={row.symbol}>
                <TableCell className="text-left">{row.company}</TableCell>
                <TableCell className="text-left">{row.symbol}</TableCell>
                <TableCell className="text-left">
                  {data.price !== null ? formatPrice(data.price) : '-'}
                </TableCell>
                <TableCell
                  className={`text-left ${getChangeColorClass(data.changePercent ?? undefined)}`}
                >
                  {data.changePercent !== null
                    ? formatChangePercent(data.changePercent)
                    : '-'}
                </TableCell>
                <TableCell className="text-left">
                  {data.marketCap !== null
                    ? formatMarketCapValue(data.marketCap)
                    : '-'}
                </TableCell>
                <TableCell className="text-left">-</TableCell>
                <TableCell className="text-left">
                  <div className="flex flex-col gap-2">
                    {symbolAlerts.length > 0 ? (
                      <div className="space-y-1">
                        {symbolAlerts.map((alert) => (
                          <div
                            key={alert.id}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Bell className="h-3 w-3 text-yellow-500" />
                            <span className="text-gray-300">
                              {getAlertText({
                                id: alert.id,
                                symbol: alert.symbol,
                                company: alert.company,
                                alertName: alert.alertName,
                                currentPrice: 0,
                                alertType: alert.alertType,
                                threshold: alert.threshold,
                              })}
                            </span>
                            <button
                              onClick={() => handleDeleteAlert(alert.id)}
                              className="ml-2 text-red-500 hover:text-red-400 cursor-pointer"
                              aria-label="Delete alert"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddAlert(row.symbol, row.company)}
                      className="w-fit text-xs"
                    >
                      <Bell className="h-3 w-3 mr-1" />
                      {symbolAlerts.length > 0 ? 'Add Another' : 'Add Alert'}
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-left">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveClick(row.symbol, row.company)}
                    className="w-fit text-xs text-red-500 hover:text-red-400 hover:border-red-500"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {selectedStock && (
        <AlertModal
          open={alertModalOpen}
          setOpen={setAlertModalOpen}
          symbol={selectedStock.symbol}
          company={selectedStock.company}
          userEmail={userEmail}
        />
      )}
      {stockToRemove && (
        <ConfirmModal
          open={confirmModalOpen}
          setOpen={setConfirmModalOpen}
          title="Remove from Watchlist"
          description={`Are you sure you want to remove ${stockToRemove.symbol} (${stockToRemove.company}) from your watchlist? This action cannot be undone.`}
          confirmText="Remove"
          cancelText="Cancel"
          onConfirm={handleRemoveFromWatchlist}
          variant="destructive"
        />
      )}
    </>
  );
}
