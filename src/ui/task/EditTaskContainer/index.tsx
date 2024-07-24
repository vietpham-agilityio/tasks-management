// APIs
import { getPartipationsByProjectId, getProjectById } from '@/api';

// Auth
import { auth } from '@/auth';

// Components
import { ErrorMessage, ItemNotFound } from '@/components';
import { EditTaskFormWrapper } from '../EditTaskFormWrapper';

// Constants
import { ERROR_MESSAGES, TAGS } from '@/constants';

// Models
import { Task } from '@/models';

type EditTaskContainerProps = {
  taskData: Task;
  isReadOnly?: boolean;
};

export const EditTaskContainer = async ({
  taskData,
  isReadOnly = false,
}: EditTaskContainerProps) => {
  const session = await auth();
  const projectId = taskData.projectId;
  const { data: participantList, error: participantListError } =
    await getPartipationsByProjectId(projectId);
  const { data: projectData, error: projectError } = await getProjectById(
    projectId,
    { options: { tags: [TAGS.PROJECT_DETAIL(projectId)] } },
  );

  const error = participantListError || projectError;

  if (error) {
    return <ErrorMessage message={error} />;
  }
  if (!projectData) {
    return (
      <ItemNotFound
        title={ERROR_MESSAGES.DATA_NOT_FOUND}
        description="Please create new user or new project to proceed."
        customClass={{
          wrapper: 'rounded-lg px-5 bg-white py-20',
        }}
      />
    );
  }

  if (!projectData.isPublic && !session) {
    return <ErrorMessage message={ERROR_MESSAGES.UNAUTHORIZED_ACCESS} />;
  }

  return (
    <EditTaskFormWrapper
      memberOptions={participantList}
      project={projectData}
      taskData={taskData}
      isReadOnly={projectData.isArchived || isReadOnly}
    />
  );
};
