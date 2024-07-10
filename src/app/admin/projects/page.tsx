// Icons
import { FaPlus } from 'react-icons/fa';

// Components
import { ProjectTable } from '@/ui';
import { ErrorMessage, NavLink } from '@/components';

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
  const { page = '1' } = searchParams;

  const {
    data = [],
    error,
    total,
  } = await getProjects({
    page: parseInt(page),
    limitItem: LIMIT_ITEMS.DEFAULT,
    orderItem: {
      field: FIELDS.UPDATED_AT,
      type: ORDER_TYPES.DESC,
    },
  });

  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="bg-white p-4 h-full">
      <div className="flex flex-row justify-between items-center py-8 ">
        <div className=" dark:text-white ">
          <h1 className="font-bold text-3xl">Projects</h1>
        </div>
        <NavLink
          href={ROUTES.ADMIN_UPSERT_PROJECT()}
          label="Create New Project"
          icon={<FaPlus />}
          className="bg-neutral-800 text-white font-bold py-3"
        />
      </div>
      <ProjectTable isAdmin={true} data={data || []} total={total} />
    </main>
  );
};

export default ProjectListPage;
