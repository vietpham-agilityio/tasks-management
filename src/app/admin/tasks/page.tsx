import { Suspense } from 'react';

// Components
import { TaskTable } from '@/ui';
import { TableSkeleton } from '@/components';

// Types
import { SearchParams } from '@/types';

const TaskListPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  return (
    <main className="bg-white dark:bg-neutral-900 p-4 h-full">
      <div className="flex flex-row justify-between items-center py-8 ">
        <div className=" dark:text-white ">
          <h1 className="font-bold text-3xl dark:text-white">Tasks</h1>
        </div>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <TaskTable searchParams={searchParams} />
      </Suspense>
    </main>
  );
};

export default TaskListPage;
