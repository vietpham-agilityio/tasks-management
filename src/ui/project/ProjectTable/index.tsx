import { Suspense } from 'react';
import Link from 'next/link';

// Auths
import { auth } from '@/auth';

// APIs
import { getProjectList } from '@/api';

// Components
import {
  ErrorMessage,
  ItemNotFound,
  PaginationWrapper,
  TableSkeleton,
  Text,
} from '@/components';
import { FilterWrapper } from '../../task';

// Constants
import {
  DATE_FORMAT,
  FIELDS,
  LIMIT_ITEMS,
  ORDER_TYPES,
  QUERY_PARAMS,
  ROUTES,
} from '@/constants';

// Icons
import { MdArrowRightAlt } from 'react-icons/md';

// Types
import { QueryFilter, SearchParams } from '@/types';

// Utils
import { formatDate } from '@/utils';
import { Session } from 'next-auth';
import { Project } from '@/models';

const TableContent = async ({
  session,
  projectListData,
  error,
}: {
  session: Session | null;
  projectListData: Project[];
  error?: string;
}) => {
  if (error) return <ErrorMessage message={error} />;

  if (projectListData.length === 0) {
    return (
      <ItemNotFound
        title="Empty Tasks"
        description="Your task are currently empty. Please create new task or stay tuned for updates"
      />
    );
  }

  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-zinc-700 dark:text-gray-300">
        <tr>
          <th className="px-6 py-4">Project</th>
          <th className="px-6 py-4 hidden lg:block">Description</th>
          <th className="px-6 py-4">Status</th>
          <th className="px-6 py-4 hidden md:block">Create at</th>
          <th className="px-6 py-4">Last modified</th>
          <th className="w-6" />
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-zinc-800">
        {projectListData?.map((project) => (
          <tr
            key={project.id}
            className="border-b-2 rounded-lg hover:bg-zinc-300 dark:hover:bg-gray-700 text-sm text-gray-900 dark:text-white"
          >
            <td className="px-6 py-4 whitespace-nowrap max-w-0 w-auto">
              <Link
                href={
                  session
                    ? ROUTES.ADMIN_PROJECT_DETAIL(project.id)
                    : ROUTES.PROJECT_DETAIL(encodeURIComponent(project.slug))
                }
                className="w-full flex items-center"
                aria-label={project.title}
              >
                <p className="truncate">{project.title}</p>
              </Link>
            </td>

            <td className="px-6 py-4 whitespace-nowrap w-full max-w-0 hidden lg:block md:min-w-full">
              <p className="truncate">{project.description}</p>
            </td>

            <td className="px-6 py-4 whitespace-nowrap max-w-0 w-auto">
              <div className="w-full capitalize">
                {project.isPublic ? 'public' : 'private'}
              </div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap max-w-0 w-auto hidden md:block">
              <div className="w-full">
                <Text
                  customClass="px-0 text-gray-900 dark:text-white"
                  value={formatDate(project.createdAt, DATE_FORMAT.Secondary)}
                />
              </div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap max-w-0 w-auto">
              <div className="w-full">
                <Text
                  customClass="px-0 text-gray-900 dark:text-white"
                  value={formatDate(project.updatedAt, DATE_FORMAT.Secondary)}
                />
              </div>
            </td>

            <td>
              <Link
                href={
                  session
                    ? ROUTES.ADMIN_TASK_DETAIL(project.id)
                    : ROUTES.TASK_DETAIL(encodeURIComponent(project.slug))
                }
                aria-label="task-detail"
                className="px-2 md:px-4 flex justify-end"
              >
                <MdArrowRightAlt className="w-6 h-6 text-gray-900 dark:text-white" />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

type ProjectTableProps = {
  searchParams: SearchParams;
};

export const ProjectTable = async ({ searchParams }: ProjectTableProps) => {
  const session = await auth();

  const { page, sortBy, filterByUser } = searchParams;

  const query: QueryFilter[] = [];

  if (!session) {
    query.push({
      field: QUERY_PARAMS.IS_PUBLIC,
      comparison: '==',
      value: true,
    });
  }

  if (filterByUser) {
    query.push({
      field: QUERY_PARAMS.FILTER_BY_USER,
      comparison: '==',
      value: filterByUser,
    });
  }

  const { data, error, total } = await getProjectList({
    page: parseInt(page || '1'),
    limitItem: LIMIT_ITEMS.DEFAULT,
    orderItem: {
      field: FIELDS.UPDATED_AT,
      type: sortBy || ORDER_TYPES.DESC,
    },
    query,
  });

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="relative overflow-x-auto">
      <FilterWrapper
        showFilterCheckbox={!!session}
        checkboxLabel="My Project(s)"
      />
      <Suspense key={JSON.stringify(searchParams)} fallback={<TableSkeleton />}>
        <TableContent session={session} projectListData={data} error={error} />
      </Suspense>
      <div className="mt-10 sm:mt-6 flex justify-end">
        {total && (
          <Suspense>
            <PaginationWrapper total={total} pageSize={LIMIT_ITEMS.DEFAULT} />
          </Suspense>
        )}
      </div>
    </div>
  );
};
