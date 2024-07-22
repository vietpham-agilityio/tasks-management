import { Metadata } from 'next';
import { Suspense } from 'react';

// Authentication
import { auth } from '@/auth';

// Constants
import { METADATA_CONTENT, ROUTES } from '@/constants';

// Components
import { ProjectTable } from '@/ui';
import { TableSkeleton } from '@/components';

// Types
import { SearchParams } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_URL;

const { TITLE, DESC } = METADATA_CONTENT.PROJECT_LIST;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${BASE_URL}${ROUTES.PROJECT_LIST}`,
  },
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
