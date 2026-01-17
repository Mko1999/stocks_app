import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

const LoadingOverlay = ({
  isLoading,
  message = 'Loading...',
}: LoadingOverlayProps) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-yellow-500" />
        <p className="text-lg font-medium text-white">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
