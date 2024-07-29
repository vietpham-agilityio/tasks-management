import { Suspense } from 'react';

// Icons
import { FaPlus } from 'react-icons/fa';

// Components
import { NavLink, ProjectPageSkeleton } from '@/components';
import { ProjectTable } from '@/ui';

// Constants
import { ROUTES } from '@/constants';

// Types
import { SearchParams } from '@/types';

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
        <NavLink
          href={ROUTES.ADMIN_PROJECT_UPSERT()}
          label="Create New Project"
          icon={<FaPlus />}
          className="bg-neutral-800 text-white font-bold py-3"
        />
      </div>
      <Suspense fallback={<ProjectPageSkeleton />}>
        <ProjectTable searchParams={searchParams} />
      </Suspense>
    </main>
  );
};

export default ProjectListPage;
