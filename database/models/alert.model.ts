import mongoose, { Document, Model, Schema } from 'mongoose';

export interface AlertItem extends Document {
  userId: string;
  symbol: string;
  company: string;
  alertName: string;
  alertType: 'upper' | 'lower';
  threshold: number;
  createdAt: Date;
}

const AlertSchema = new Schema<AlertItem>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    symbol: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    alertName: {
      type: String,
      required: true,
      trim: true,
    },
    alertType: {
      type: String,
      required: true,
      enum: ['upper', 'lower'],
    },
    threshold: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

AlertSchema.index({ userId: 1, symbol: 1 });

const Alert: Model<AlertItem> =
  mongoose.models?.Alert || mongoose.model<AlertItem>('Alert', AlertSchema);

export default Alert;
