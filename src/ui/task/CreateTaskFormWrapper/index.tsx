'use client';

import { useFormState } from 'react-dom';

// APIs
import { createTask } from '@/actions';

// Components
import { TaskForm } from '../TaskForm';

// Models
import { User } from '@/types';
import { Project } from '@/models';

type CreateTaskFormWrapperProps = {
  memberOptions: User[];
  listProject: Project[];
};

export const CreateTaskFormWrapper = ({
  memberOptions,
  listProject,
}: CreateTaskFormWrapperProps) => {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createTask, initialState);

  return (
    <TaskForm
      assginedToOptions={memberOptions}
      fromProject={listProject}
      state={state}
      onSubmit={dispatch}
    />
  );
};
