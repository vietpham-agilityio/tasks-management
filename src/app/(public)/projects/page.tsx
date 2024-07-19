import { Metadata } from 'next';
import { Suspense } from 'react';

// Authentication
import { auth } from '@/auth';

// Components
import { ProjectTable } from '@/ui';
import { TableSkeleton } from '@/components';

// Types
import { SearchParams } from '@/types';

export const metadata: Metadata = {
  title: 'Project List',
  description:
    'A detailed overview of all ongoing and completed projects, including project description, timelines, and team assignments.',
};

const ProjectListPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const session = await auth();

  return (
    <main className="p-4 h-full">
      <div className="flex flex-row justify-between items-center py-8 ">
        <div className=" dark:text-white ">
          <h1 className="font-bold text-3xl">Projects</h1>
        </div>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <ProjectTable isAuthenticated={!!session} searchParams={searchParams} />
      </Suspense>
    </main>
  );
};

export default ProjectListPage;
