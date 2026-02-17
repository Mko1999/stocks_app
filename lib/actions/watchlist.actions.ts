'use server';

import Watchlist from '@/database/models/watchlist.model';
import { connectToDatabase } from '@/database/mongoose';
import { getUserIdByEmail } from './user.actions';

export async function getWatchlistSymbolsByEmail(
  email: string
): Promise<string[]> {
  const userId = await getUserIdByEmail(email);
  if (!userId) return [];

  try {
    await connectToDatabase();

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    return items.map((i) => String(i.symbol));
  } catch (err) {
    console.error('getWatchlistSymbolsByEmail error:', err);
    return [];
  }
}

export async function addToWatchlist(
  email: string,
  symbol: string,
  company: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const userId = await getUserIdByEmail(email);
    if (!userId) {
      return { success: false, error: 'User not found' };
    }

    await connectToDatabase();

    await Watchlist.create({
      userId,
      symbol: symbol.toUpperCase().trim(),
      company: company.trim(),
    });

    return { success: true };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : 'Failed to add to watchlist';
    console.error('addToWatchlist error:', err);
    return { success: false, error: errorMessage };
  }
}

export async function removeFromWatchlist(
  email: string,
  symbol: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const userId = await getUserIdByEmail(email);
    if (!userId) {
      return { success: false, error: 'User not found' };
    }

    await connectToDatabase();

    await Watchlist.deleteOne({
      userId,
      symbol: symbol.toUpperCase().trim(),
    });

    return { success: true };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : 'Failed to remove from watchlist';
    console.error('removeFromWatchlist error:', err);
    return { success: false, error: errorMessage };
  }
}

export async function getWatchlistByEmail(
  email: string
): Promise<Array<{ symbol: string; company: string; addedAt: Date }>> {
  const userId = await getUserIdByEmail(email);
  if (!userId) return [];

  try {
    await connectToDatabase();

    const items = await Watchlist.find({ userId }).sort({ addedAt: -1 }).lean();

    return items.map((item) => ({
      symbol: String(item.symbol),
      company: String(item.company),
      addedAt: item.addedAt,
    }));
  } catch (err) {
    console.error('getWatchlistByEmail error:', err);
    return [];
  }
}
