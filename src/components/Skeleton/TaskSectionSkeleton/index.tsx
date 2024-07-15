// Constants
import { LIMIT_ITEMS } from '@/constants';

// Components
import { OverviewCardSkeleton } from '../OverviewCardSkeleton';

type TaskSectionSkeletonProps = {
  totalItems?: number;
};

export const TaskSectionSkeleton = ({
  totalItems = LIMIT_ITEMS.DEFAULT,
}: TaskSectionSkeletonProps) => (
  <div className="animate-pulse flex flex-col gap-4 pt-2">
    <div className="w-full h-10 bg-gray-200 rounded-lg dark:bg-gray-700" />
    <div className="flex flex-col gap-4 ">
      {[...Array(totalItems)].map((_, index) => (
        <OverviewCardSkeleton
          key={`overview-card-${index}`}
          isRowDisplay={false}
        />
      ))}
    </div>
  </div>
);
