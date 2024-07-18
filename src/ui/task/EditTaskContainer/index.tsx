// APIs
import { getPartipationsByProjectId, getProjectById } from '@/api';

// Components
import { ErrorMessage, ItemNotFound } from '@/components';
import { EditTaskFormWrapper } from '../EditTaskFormWrapper';

// Constants
import { ERROR_MESSAGES } from '@/constants';

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
  const projectId = taskData.projectId;
  const { data: participantList, error: participantListError } =
    await getPartipationsByProjectId(projectId);
  const { data: projectData, error: projectError } =
    await getProjectById(projectId);

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
  return (
    <EditTaskFormWrapper
      memberOptions={participantList}
      project={projectData}
      taskData={taskData}
      isReadOnly={projectData.isArchived || isReadOnly}
    />
  );
};
