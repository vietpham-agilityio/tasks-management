// Constants
import { LIMIT_ITEMS } from '@/constants';

// Utils
import { cn } from '@/utils';

type TableSkeletonProps = {
  totalItems?: number;
};

const TableRowSkeleton = () => (
  <div
    className={cn(
      'animate-pulse flex flex-col border p-3.5 dark:bg-zinc-800 dark:border-gray-700',
    )}
  >
    <div className="animate-pulse flex flex-1 flex-col gap-1 dark:text-white min-w-0">
      <div className="h-7 bg-gray-200 rounded-lg dark:bg-gray-700 w-full" />
    </div>
  </div>
);

export const TableSkeleton = ({
  totalItems = LIMIT_ITEMS.DEFAULT,
}: TableSkeletonProps) => (
  <div className="bg-white dark:bg-zinc-800 p-4 pb-2 rounded-lg">
    <div className="flex w-full gap-2">
      {[...Array(4)].map((_, index) => (
        <div
          key={`skeleton-div-${index}`}
          className="h-12 flex-1 bg-gray-200 rounded-lg dark:bg-gray-700"
        />
      ))}
    </div>
    <div className="flex flex-col w-full pt-4">
      {[...Array(totalItems)].map((_, index) => (
        <TableRowSkeleton key={`overview-card-${index}`} />
      ))}
    </div>
  </div>
);
