import { Suspense } from 'react';
import { Metadata } from 'next';

// Constants
import { METADATA_CONTENT, ROUTES } from '@/constants';

// Components
import { ProjectTable } from '@/ui';
import { ProjectPageSkeleton } from '@/components';

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

const ProjectListPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  return (
    <main className="p-4 h-full">
      <div className="flex flex-row justify-between items-center py-8 ">
        <div className=" dark:text-white ">
          <h1 className="font-bold text-3xl">Projects</h1>
        </div>
      </div>
      <Suspense fallback={<ProjectPageSkeleton />}>
        <ProjectTable searchParams={searchParams} />
      </Suspense>
    </main>
  );
};

export default ProjectListPage;
