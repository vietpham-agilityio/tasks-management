import Link from 'next/link';

// Components
import { ItemNotFound, Text } from '@/components';

// Constants
import { MOCK_PROJECT_LIST, ROUTES } from '@/constants';

// Models
import { Project } from '@/models';

// Utils
import { formatDate } from '@/utils';

type ProjectTableProps = {
  isAdmin?: boolean;
};

export const ProjectTable = ({ isAdmin = false }: ProjectTableProps) => {
  // TODO: Call API and Apply Streaming
  const data: Project[] = MOCK_PROJECT_LIST;

  if (data.length === 0) {
    return (
      <ItemNotFound
        title="Empty Projects"
        description="Your projects are currently empty. Please create new projects or stay tuned for updates"
      />
    );
  }

  return (
    <div className="border rounded-lg dark:text-white dark:bg-zinc-500">
      <div className="flex items-center gap-2 border-b-2 px-8 py-3 md:p-8 font-bold ">
        <div className="basis-4/12">Project Name</div>
        <div className="basis-4/12">Description</div>
        <div className="basis-2/12">Created At</div>
      </div>
      <div>
        {data.map((project) => (
          <Link
            href={
              isAdmin
                ? ROUTES.ADMIN_PROJECT_DETAIL(project.id)
                : ROUTES.PROJECT_DETAIL(project.slug)
            }
            className="flex items-center gap-2 border-b-2 px-8 py-5 rounded-lg hover:bg-zinc-300 text-sm "
            key={project.id}
          >
            <Text
              customClass="basis-4/12 truncate font-bold"
              value={project.title}
            />
            <Text
              customClass="basis-4/12 truncate text-zinc-500"
              value={project.description}
            />
            <Text
              customClass="basis-2/12 text-zinc-500"
              value={formatDate(project.createdAt)}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
