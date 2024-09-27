import { Button } from '@/components/ui/button';
import { Store } from 'lucide-react';

interface MartNoItemsFoundProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function MartNoItemsFound({
  title = 'No items found',
  description = '',
  actionLabel = 'Browse Categories',
  onAction,
}: MartNoItemsFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4 text-center rounded-lg">
      <div className="bg-primary/10 p-3 rounded-full mb-4">
        <Store className="w-12 h-12 text-primary" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-500 mb-6 max-w-md">{description}</p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          variant="outline"
          className="bg-white hover:bg-gray-100"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
