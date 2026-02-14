'use server';

import Watchlist from '@/database/models/watchlist.model';
import { connectToDatabase } from '@/database/mongoose';

export async function getWatchlistSymbolsByEmail(
  email: string
): Promise<string[]> {
  if (!email) return [];

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    // Better Auth stores users in the "user" collection
    const user = await db
      .collection('user')
      .findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

    if (!user) return [];

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) return [];

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    return items.map((i) => String(i.symbol));
  } catch (err) {
    console.error('getWatchlistSymbolsByEmail error:', err);
    return [];
  }
}

async function getUserIdByEmail(email: string): Promise<string | null> {
  if (!email) return null;

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    const user = await db
      .collection('user')
      .findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

    if (!user) return null;

    return user.id || String(user._id || '');
  } catch (err) {
    console.error('getUserIdByEmail error:', err);
    return null;
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
