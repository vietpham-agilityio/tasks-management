import { Suspense } from 'react';

// Authentication
import { auth } from '@/auth';

// Icons
import { FaPlus } from 'react-icons/fa';

// Components
import { ProjectTable } from '@/ui';
import { ErrorMessage, NavLink, TableSkeleton } from '@/components';

// Constants
import { FIELDS, LIMIT_ITEMS, ORDER_TYPES, ROUTES } from '@/constants';

// APIs
import { getProjects } from '@/api';

// Types
import { SearchParams } from '@/types';

const ProjectListPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const session = await auth();

  const { page = '1' } = searchParams;

  const { data, error, total } = await getProjects({
    page: parseInt(page),
    limitItem: LIMIT_ITEMS.DEFAULT,
    orderItem: {
      field: FIELDS.UPDATED_AT,
      type: ORDER_TYPES.DESC,
    },
  });

  if (error) return <ErrorMessage message={error} />;

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
      <Suspense fallback={<TableSkeleton />}>
        <ProjectTable isAuthenticated={!!session} data={data} total={total} />
      </Suspense>
    </main>
  );
};

export default ProjectListPage;
