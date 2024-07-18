'use client';

import { useFormState } from 'react-dom';

// APIs
import { editTask } from '@/actions';

// Components
import { TaskForm } from '../TaskForm';

// Models
import { Participation, Project, Task } from '@/models';

type CreateTaskFormWrapperProps = {
  memberOptions: Participation[];
  project: Project;
  taskData: Task;
  isReadOnly: boolean;
};

export const EditTaskFormWrapper = ({
  memberOptions,
  project,
  taskData,
  isReadOnly,
}: CreateTaskFormWrapperProps) => {
  const initialState = { message: null, formErrors: {} };
  const editTaskWithId = editTask.bind(null, taskData.id);
  const [state, dispatch] = useFormState(editTaskWithId, initialState);

  return (
    <TaskForm
      state={state}
      assginedToOptions={memberOptions}
      fromProject={project}
      taskValue={taskData}
      onSubmit={dispatch}
      isReadOnly={isReadOnly}
    />
  );
};
