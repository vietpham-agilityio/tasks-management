// Constants
import { LIMIT_ITEMS } from '@/constants';

// Components
import { OverviewCardSkeleton } from '../OverviewCardSkeleton';

type ProjectListSkeletonProps = {
  totalItems?: number;
};

export const ProjectListSkeleton = ({
  totalItems = LIMIT_ITEMS.BOARD_PAGE,
}: ProjectListSkeletonProps) => (
  <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
    <div className="animate-pulse h-10 w-20 bg-gray-200 rounded-lg dark:bg-gray-700  mb-4" />
    <div className="grid grid-cols-2 md:grid-cols-3 gap-7 pt-3">
      {[...Array(totalItems)].map((_, index) => (
        <OverviewCardSkeleton
          key={`overview-card-${index}`}
          isRowDisplay={true}
        />
      ))}
    </div>
  </div>
);
