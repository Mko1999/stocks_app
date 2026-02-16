'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import InputField from '@/components/forms/InputField';
import SelectField from '@/components/forms/SelectField';
import { useForm } from 'react-hook-form';
import { createAlert } from '@/lib/actions/alert.actions';
import { ALERT_TYPE_OPTIONS } from '@/lib/constants';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type AlertModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  symbol: string;
  company: string;
  userEmail: string;
};

type AlertFormData = {
  alertName: string;
  alertType: 'upper' | 'lower';
  threshold: string;
};

export default function AlertModal({
  open,
  setOpen,
  symbol,
  company,
  userEmail,
}: AlertModalProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<AlertFormData>({
    defaultValues: {
      alertName: '',
      alertType: 'upper',
      threshold: '',
    },
    mode: 'onChange',
  });

  const alertType = watch('alertType');
  const threshold = watch('threshold');

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = async (data: AlertFormData) => {
    if (!userEmail) {
      toast.error('Please sign in to create alerts');
      return;
    }

    setIsSubmitting(true);
    try {
      const threshold = parseFloat(data.threshold);
      if (isNaN(threshold) || threshold <= 0) {
        toast.error('Please enter a valid price threshold');
        setIsSubmitting(false);
        return;
      }

      const result = await createAlert(
        userEmail,
        symbol,
        company,
        data.alertName,
        data.alertType,
        threshold
      );

      if (result.success) {
        toast.success('Alert created successfully');
        setOpen(false);
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to create alert');
      }
    } catch {
      toast.error('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-gray-900 text-gray-100 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create Price Alert for {symbol}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Set up a price alert for {company} ({symbol})
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            <InputField
              name="alertName"
              label="Alert Name"
              placeholder="e.g., Price Breakout"
              register={register}
              error={errors.alertName}
              validation={{ required: 'Alert name is required' }}
            />
            <SelectField
              name="alertType"
              label="Alert Type"
              placeholder="Select alert type"
              options={ALERT_TYPE_OPTIONS}
              control={control}
              error={errors.alertType}
              required
            />
            <InputField
              name="threshold"
              label="Price Threshold ($)"
              placeholder="e.g., 150.00"
              type="number"
              step="0.01"
              register={register}
              error={errors.threshold}
              validation={{
                required: 'Price threshold is required',
                min: { value: 0.01, message: 'Price must be greater than 0' },
              }}
            />
            <div className="text-sm text-gray-400 mt-2">
              {alertType === 'upper' ? (
                <p>
                  Alert will trigger when price goes above ${threshold || '0'}
                </p>
              ) : (
                <p>
                  Alert will trigger when price goes below ${threshold || '0'}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Alert'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
