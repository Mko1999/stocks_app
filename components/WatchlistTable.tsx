import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { WATCHLIST_TABLE_HEADER } from '@/lib/constants';

export default function WatchlistTable({
  watchlist,
}: {
  watchlist: Array<{ symbol: string; company: string; addedAt: Date }>;
}) {
  return (
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
        {watchlist.map((row) => (
          <TableRow key={row.symbol}>
            <TableCell className="text-left">{row.company}</TableCell>
            <TableCell className="text-left">{row.symbol}</TableCell>
            <TableCell className="text-left">-</TableCell>
            <TableCell className="text-left">-</TableCell>
            <TableCell className="text-left">-</TableCell>
            <TableCell className="text-left">-</TableCell>
            <TableCell className="text-left">Add Alert</TableCell>
            <TableCell className="text-left">Remove</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
