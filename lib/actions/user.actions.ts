'use server';

import { connectToDatabase } from '@/database/mongoose';

export async function getUserIdByEmail(email: string): Promise<string | null> {
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

export const getAllUsersForNewsEmail = async () => {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('Could not connect to database');
    const users = await db
      .collection('user')
      .find(
        { email: { $exists: true, $ne: null } },
        { projection: { id: 1, email: 1, name: 1, country: 1 } }
      )
      .toArray();
    return users
      .filter((user) => user.email && user.name)
      .map((user) => ({
        id: user.id || user._id.toString() || '',
        email: user.email,
        name: user.name,
      }));
  } catch (error) {
    console.error('Error getting all users for news email:', error);
    return [];
  }
};
