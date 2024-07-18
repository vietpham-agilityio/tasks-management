import { Suspense } from 'react';
import type { Metadata } from 'next';

// Components
import { ProjectList, RecentlyCreatedTasktList, TaskList } from '@/ui';
import {
  ProjectListSkeleton,
  RecentlyCreatedTaskListSkeleton,
  TaskListSkeleton,
} from '@/components';

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    'A comprehensive web application for managing projects and tasks, providing tools for tracking progress, assigning priorities, and collaborating with team members.',
};

const BoardsPage = () => {
  return (
    <main className="pt-4">
      <div className="grid grid-cols-1 lg:grid-cols-5 md:gap-7">
        <div className="col-span-3 flex flex-col gap-8">
          <Suspense fallback={<TaskListSkeleton />}>
            <TaskList />
          </Suspense>
          <Suspense fallback={<ProjectListSkeleton />}>
            <ProjectList />
          </Suspense>
        </div>
        <div className="col-span-2 pt-8 md:pt-0">
          <Suspense fallback={<RecentlyCreatedTaskListSkeleton />}>
            <RecentlyCreatedTasktList />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default BoardsPage;
