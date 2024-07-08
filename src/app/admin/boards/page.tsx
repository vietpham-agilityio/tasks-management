import { Suspense } from 'react';

// Components
import { ProjectList, RecentlyCreatedTasktList, TaskList } from '@/ui';

const BoardsPage = () => {
  return (
    <main className="pt-4">
      <div className="grid grid-cols-1 lg:grid-cols-5 md:gap-7">
        <div className="col-span-3 flex flex-col gap-8">
          <Suspense>
            <TaskList />
          </Suspense>
          <Suspense>
            <ProjectList />
          </Suspense>
        </div>
        <div className="col-span-2 pt-8 md:pt-0">
          <Suspense>
            <RecentlyCreatedTasktList />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default BoardsPage;
