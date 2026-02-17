'use server';

import Alert from '@/database/models/alert.model';
import { connectToDatabase } from '@/database/mongoose';
import { getUserIdByEmail } from './user.actions';

export async function createAlert(
  email: string,
  symbol: string,
  company: string,
  alertName: string,
  alertType: 'upper' | 'lower',
  threshold: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const userId = await getUserIdByEmail(email);
    if (!userId) {
      return { success: false, error: 'User not found' };
    }

    await connectToDatabase();

    await Alert.create({
      userId,
      symbol: symbol.toUpperCase().trim(),
      company: company.trim(),
      alertName: alertName.trim(),
      alertType,
      threshold,
    });

    return { success: true };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : 'Failed to create alert';
    console.error('createAlert error:', err);
    return { success: false, error: errorMessage };
  }
}

export async function getAlertsByEmail(email: string): Promise<
  Array<{
    id: string;
    symbol: string;
    company: string;
    alertName: string;
    alertType: 'upper' | 'lower';
    threshold: number;
    createdAt: Date;
  }>
> {
  const userId = await getUserIdByEmail(email);
  if (!userId) return [];

  try {
    await connectToDatabase();

    const alerts = await Alert.find({ userId }).sort({ createdAt: -1 }).lean();

    return alerts.map((alert) => ({
      id: String(alert._id),
      symbol: String(alert.symbol),
      company: String(alert.company),
      alertName: String(alert.alertName),
      alertType: alert.alertType as 'upper' | 'lower',
      threshold: Number(alert.threshold),
      createdAt: alert.createdAt,
    }));
  } catch (err) {
    console.error('getAlertsByEmail error:', err);
    return [];
  }
}

export async function getAlertsBySymbol(
  email: string,
  symbol: string
): Promise<
  Array<{
    id: string;
    symbol: string;
    company: string;
    alertName: string;
    alertType: 'upper' | 'lower';
    threshold: number;
    createdAt: Date;
  }>
> {
  if (!email || !symbol) return [];

  const userId = await getUserIdByEmail(email);
  if (!userId) return [];

  try {
    await connectToDatabase();

    const alerts = await Alert.find({
      userId,
      symbol: symbol.toUpperCase().trim(),
    })
      .sort({ createdAt: -1 })
      .lean();

    return alerts.map((alert) => ({
      id: String(alert._id),
      symbol: String(alert.symbol),
      company: String(alert.company),
      alertName: String(alert.alertName),
      alertType: alert.alertType as 'upper' | 'lower',
      threshold: Number(alert.threshold),
      createdAt: alert.createdAt,
    }));
  } catch (err) {
    console.error('getAlertsBySymbol error:', err);
    return [];
  }
}

export async function deleteAlert(
  email: string,
  alertId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const userId = await getUserIdByEmail(email);
    if (!userId) {
      return { success: false, error: 'User not found' };
    }

    await connectToDatabase();

    await Alert.deleteOne({
      _id: alertId,
      userId,
    });

    return { success: true };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : 'Failed to delete alert';
    console.error('deleteAlert error:', err);
    return { success: false, error: errorMessage };
  }
}
