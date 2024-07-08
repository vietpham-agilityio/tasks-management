// Components
import { ProjectTable } from '@/ui';
import { NavLink } from '@/components';

// Constants
import { ROUTES } from '@/constants';

// Icons
import { FaPlus } from 'react-icons/fa';

const ProjectListPage = () => (
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
    <ProjectTable isAdmin={true} />
  </main>
);

export default ProjectListPage;
