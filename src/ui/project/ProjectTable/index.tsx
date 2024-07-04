import Link from 'next/link';

// Icons
import { MdArrowRightAlt } from 'react-icons/md';

// Components
import { ItemNotFound, Text } from '@/components';

// Constants
import { DATE_FORMAT, ROUTES } from '@/constants';

// Utils
import { formatDate } from '@/utils';

// APIs
import { getProjects } from '@/api';

type ProjectTableProps = {
  isAdmin?: boolean;
};

export const ProjectTable = async ({ isAdmin = false }: ProjectTableProps) => {
  // Caching data with tags
  const { data, error } = await getProjects();

  if (data?.length === 0) {
    return (
      <ItemNotFound
        title="Empty Projects"
        description="Your projects are currently empty. Please create new projects or stay tuned for updates"
      />
    );
  }

  if (error)
    return (
      <div className="text-center py-10 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Error</h1>
        <h2 className="text-md md:text-lg">{error}</h2>
      </div>
    );

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr className="font-bold">
            <th className="px-6 py-4">Project Name</th>
            <th colSpan={2} className="px-6">
              Description
            </th>
            <th className="px-2">Status</th>
            <th className="px-2">Create at</th>
            <th className="px-2">Last modified</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data?.map((project) => (
            <tr
              key={project.id}
              className="border-b-2 px-8 py-5 rounded-lg hover:bg-zinc-300 text-sm"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-full max-w-0 sm:w-auto">
                <Link
                  href={
                    isAdmin
                      ? ROUTES.ADMIN_PROJECT_DETAIL(project.id)
                      : ROUTES.PROJECT_DETAIL(project.slug)
                  }
                >
                  <p className="truncate">{project.title}</p>
                </Link>
              </td>
              <td
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-full max-w-0 sm:w-auto"
                colSpan={2}
              >
                <p className="truncate">{project.description}</p>
              </td>
              <td>
                <Text
                  customClass="basis-4/12 capitalize"
                  value={project.isPublic ? 'public' : 'private'}
                />
              </td>
              <td>
                <Text
                  customClass="basis-4/12"
                  value={formatDate(project.createdAt, DATE_FORMAT.Secondary)}
                />
              </td>
              <td>
                <div className="flex justify-between w-full">
                  <Text
                    customClass="w-full"
                    value={formatDate(project.updatedAt, DATE_FORMAT.Secondary)}
                  />
                  <Link
                    href={
                      isAdmin
                        ? ROUTES.ADMIN_PROJECT_DETAIL(project.id)
                        : ROUTES.PROJECT_DETAIL(project.slug)
                    }
                    className="w-full px-4 flex justify-end"
                  >
                    <MdArrowRightAlt className="w-6 h-6" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
