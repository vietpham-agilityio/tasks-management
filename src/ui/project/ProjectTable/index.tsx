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
      {data.length === 0 ? (
        <ItemNotFound
          title="Empty Projects"
          description="Your projects are currently empty. Please create new projects or stay tuned for updates"
        />
      ) : (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-zinc-700 dark:text-gray-300">
            <tr className="font-bold">
              <th className="px-2 sm:px-6 py-4">Project</th>
              <th className="px-6 hidden sm:block mt-3.5">Description</th>
              <th className="px-2">Status</th>
              <th className="px-2 min-w-[100px]">Create at</th>
              <th className="px-2">Last modified</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-zinc-800">
            {data?.map((project) => (
              <tr
                key={project.id}
                className="border-b-2 px-8 py-5 rounded-lg hover:bg-zinc-300 dark:hover:bg-gray-700 text-sm text-gray-900 dark:text-white"
              >
                <td className="px-2 sm:px-6 py-4 font-medium whitespace-nowrap w-full max-w-0 sm:w-auto">
                  <Link
                    href={
                      session
                        ? ROUTES.ADMIN_PROJECT_DETAIL(project.id)
                        : ROUTES.PROJECT_DETAIL(
                            encodeURIComponent(project.slug),
                          )
                    }
                    className="w-full px-4 flex items-center"
                    aria-label={project.title}
                  >
                    <p className="truncate">{project.title}</p>
                  </Link>
                </td>
                <td className="px-6 py-4 font-medium whitespace-nowrap w-full max-w-0 min-w-[200px] hidden sm:block md:min-w-full">
                  <p className="truncate">{project.description}</p>
                </td>
                <td>
                  <Text
                    customClass="basis-4/12 capitalize text-gray-900 dark:text-white"
                    value={project.isPublic ? 'public' : 'private'}
                  />
                </td>
                <td>
                  <Text
                    customClass="min-w-20 text-gray-900 dark:text-white"
                    value={formatDate(project.createdAt, DATE_FORMAT.Secondary)}
                  />
                </td>
                <td>
                  <div className="flex justify-between w-full">
                    <Text
                      customClass="w-full text-gray-900 dark:text-white"
                      value={formatDate(
                        project.updatedAt,
                        DATE_FORMAT.Secondary,
                      )}
                    />
                    <Link
                      href={
                        session
                          ? ROUTES.ADMIN_PROJECT_DETAIL(project.id)
                          : ROUTES.PROJECT_DETAIL(
                              encodeURIComponent(project.slug),
                            )
                      }
                      className="w-full px-4 flex justify-end"
                      aria-label={project.title}
                    >
                      <MdArrowRightAlt className="w-6 h-6" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
