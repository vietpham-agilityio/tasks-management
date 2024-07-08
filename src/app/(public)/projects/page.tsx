// Components
import { ProjectTable } from '@/ui';

const ProjectListPage = () => (
  <main className="bg-white p-4 h-full">
    <div className="flex flex-row justify-between items-center py-8 ">
      <div className=" dark:text-white ">
        <h1 className="font-bold text-3xl">Projects</h1>
      </div>
    </div>
    <ProjectTable isAdmin={true} />
  </main>
);

export default ProjectListPage;
