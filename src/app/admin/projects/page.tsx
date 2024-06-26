// Components
import { ProjectTable } from '@/ui';
import { NavLink } from '@/components';

// Constants
import { ROUTES } from '@/constants';

// Icons
import { FaPlus } from 'react-icons/fa';

const ProjectListPage = () => {
  return (
    <main className="p-8">
      <div className="flex flex-row justify-between items-center py-8">
        <div className=" dark:text-white ">
          <h1 className="font-bold text-3xl">Projects</h1>
        </div>
        <NavLink
          href={ROUTES.ADMIN_CREATE_PROJECT}
          label="Create New Project"
          icon={<FaPlus />}
          className="bg-black text-white font-bold py-3"
        />
      </div>
      <ProjectTable isAdmin={true} />
    </main>
  );
};

export default ProjectListPage;
