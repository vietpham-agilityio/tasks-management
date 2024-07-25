import { Suspense } from 'react';
import type { Metadata } from 'next';

// Constants
import { METADATA_CONTENT, ROUTES } from '@/constants';

// Components
import { ProjectList, RecentlyCreatedTaskList, TaskList } from '@/ui';
import {
  ProjectListSkeleton,
  RecentlyCreatedTaskListSkeleton,
  TaskListSkeleton,
} from '@/components';

const BASE_URL = process.env.NEXT_PUBLIC_URL;

const { TITLE, DESC } = METADATA_CONTENT.BOARDS;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${BASE_URL}${ROUTES.BOARDS}`,
    images: [
      {
        url: '/Opengraph/open-graph-boards.png',
        width: 1200,
        height: 630,
        alt: DESC,
      },
    ],
  },
};

const BoardsPage = () => {
  return (
    <main className="pt-4">
      <div className="grid grid-cols-1 lg:grid-cols-8 md:gap-7">
        <div className="lg:col-span-6 flex flex-col gap-8">
          <Suspense fallback={<TaskListSkeleton />}>
            <TaskList />
          </Suspense>
          <Suspense fallback={<ProjectListSkeleton />}>
            <ProjectList />
          </Suspense>
        </div>
        <div className="lg:col-span-2 pt-8 md:pt-0">
          <Suspense fallback={<RecentlyCreatedTaskListSkeleton />}>
            <RecentlyCreatedTaskList />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default BoardsPage;
