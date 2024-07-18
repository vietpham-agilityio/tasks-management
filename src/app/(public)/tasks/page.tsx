import { Suspense } from 'react';

// Auth
import { auth } from '@/auth';

// Components
import { TableSkeleton } from '@/components';
import { TaskTable } from '@/ui';

// Types
import { SearchParams } from '@/types';

const TaskListPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const session = await auth();

  return (
    <main className="bg-white dark:bg-neutral-900 p-4 h-full">
      <div className="flex flex-row justify-between items-center py-8 ">
        <div className=" dark:text-white ">
          <h1 className="font-bold text-3xl dark:text-white">Tasks</h1>
        </div>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <TaskTable isAuthenticated={!!session} searchParams={searchParams} />
      </Suspense>
    </main>
  );
};

export default TaskListPage;
