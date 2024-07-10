// Utils
import { cn } from '@/utils';

type OverviewCardSkeletonProps = {
  isRowDisplay?: boolean;
};

export const OverviewCardSkeleton = ({
  isRowDisplay = false,
}: OverviewCardSkeletonProps) => (
  <div
    className={cn(
      'animate-pulse flex flex-col border rounded-lg p-5 dark:bg-zinc-800 dark:border-gray-700',
      isRowDisplay && 'md:flex-row md:gap-4',
    )}
  >
    <div
      className={cn(
        'max-w-24 rounded-lg bg-gray-200 dark:bg-gray-700',
        isRowDisplay && 'flex-1 md:basis-2/5',
      )}
    />
    <div
      className={cn(
        'animate-pulse flex flex-1 flex-col gap-1 dark:text-white min-w-0',
        isRowDisplay && 'md:basis-3/5',
      )}
    >
      <div className="h-5 bg-gray-200 rounded-lg dark:bg-gray-700 w-full" />
      <div className="h-5 bg-gray-200 rounded-lg dark:bg-gray-700 w-full" />
    </div>
  </div>
);
