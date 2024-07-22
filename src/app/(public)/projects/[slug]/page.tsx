import { Suspense } from 'react';

// Metadata
import { Metadata } from 'next';

// APIs
import { getProjectBySlug } from '@/api';

// Components
import { ProjectHeader, TaskSection } from '@/ui';
import {
  ErrorMessage,
  ItemNotFound,
  ProjectHeaderSkeleton,
  TaskSectionSkeleton,
} from '@/components';

// Constants
import { ROUTES, TAGS, TASK_STATUS_OPTIONS } from '@/constants';

// Types
import { SearchParams } from '@/types';

type Props = {
  params: { slug: string };
};

const BASE_URL = process.env.NEXT_PUBLIC_URL;

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const slug = params.slug;

  const { data: project } = await getProjectBySlug(decodeURIComponent(slug));

  return {
    title: project?.title,
    description: project?.description,
    openGraph: {
      title: project?.title,
      description: project?.description,
      url: `${BASE_URL}${ROUTES.PROJECT_DETAIL(project?.slug)}`,
      images: project?.image,
    },
  };
};

const ProjectDetailPage = async ({
  params,
  searchParams,
}: {
  params: { id: string; slug: string };
  searchParams: SearchParams;
}) => {
  const { sortBy, priority } = searchParams;
  const slug = params.slug;

  const { data: projectData, error: projectError } = await getProjectBySlug(
    decodeURIComponent(slug),
    { options: { tags: [TAGS.PROJECT_DETAIL(slug)] } },
  );

  if (projectError) {
    return <ErrorMessage message={projectError} />;
  }

  if (!projectData) {
    return (
      <ItemNotFound
        title="Project Not Found"
        description="Please create a new project or stay tuned for updates"
        customClass={{
          wrapper: ' rounded-lg px-5 bg-white  py-20',
        }}
      />
    );
  }

  return (
    <main className="grid grid-flow-row gap-3">
      <h1 className="font-bold text-3xl dark:text-white pb-[43px] pt-5">
        Project Board
      </h1>
      <Suspense fallback={<ProjectHeaderSkeleton />}>
        <ProjectHeader project={projectData} />
      </Suspense>
      <div className="grid grid-rows-1 md:grid-cols-3 gap-6 pt-5 divide-y-2 md:divide-y-0">
        {TASK_STATUS_OPTIONS.map(({ name, value }) => (
          <Suspense fallback={<TaskSectionSkeleton />} key={`section-${name}`}>
            <TaskSection
              key={`section-${name}`}
              projectId={projectData.id}
              sortBy={sortBy}
              priority={priority}
              title={name}
              value={value}
            />
          </Suspense>
        ))}
      </div>
    </main>
  );
};

export default ProjectDetailPage;
