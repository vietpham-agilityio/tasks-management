'use client';

import { useFormState } from 'react-dom';

// APIs
import { editTask } from '@/actions';

// Components
import { TaskForm } from '../TaskForm';

// Models
import { User } from '@/types';
import { Project, Task } from '@/models';

type CreateTaskFormWrapperProps = {
  memberOptions: User[];
  listProject: Project[];
  taskData: Task;
};

export const EditTaskFormWrapper = ({
  memberOptions,
  listProject,
  taskData,
}: CreateTaskFormWrapperProps) => {
  const initialState = { message: null, formErrors: {} };
  const editTaskWithId = editTask.bind(null, taskData.id);
  const [state, dispatch] = useFormState(editTaskWithId, initialState);

  return (
    <TaskForm
      state={state}
      assginedToOptions={memberOptions}
      fromProject={listProject}
      taskValue={taskData}
      onSubmit={dispatch}
    />
  );
};
