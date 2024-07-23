import { Suspense } from 'react';

// Constants
import { METADATA_CONTENT, ROUTES } from '@/constants';

// Components
import { TableSkeleton } from '@/components';
import { TaskTable } from '@/ui';

// Types
import { Metadata } from 'next';
import { SearchParams } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_URL;

const { TITLE, DESC } = METADATA_CONTENT.TASK_LIST;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${BASE_URL}${ROUTES.TASK_LIST}`,
    images: '/open-graph-image.webp',
  },
};

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
