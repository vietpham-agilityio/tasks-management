'use client';

import { useFormState } from 'react-dom';

// APIs
import { createTask } from '@/actions';

// Components
import { TaskForm } from '../TaskForm';

// Models
import { User } from '@/types';

type CreateTaskFormWrapperProps = {
  memberOptions: User[];
};

export const CreateTaskFormWrapper = ({
  memberOptions,
}: CreateTaskFormWrapperProps) => {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createTask, initialState);

  return (
    <TaskForm
      assginedToOptions={memberOptions}
      state={state}
      onSubmit={dispatch}
    />
  );
};
