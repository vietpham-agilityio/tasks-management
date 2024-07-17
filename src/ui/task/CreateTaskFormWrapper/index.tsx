'use client';

import { useFormState } from 'react-dom';

// APIs
import { addTaskToProject } from '@/actions';

// Components
import { TaskForm } from '../TaskForm';

// Models
import { Participation, Project } from '@/models';

type CreateTaskFormWrapperProps = {
  memberOptions: Participation[];
  project: Project;
};

export const CreateTaskFormWrapper = ({
  memberOptions,
  project,
}: CreateTaskFormWrapperProps) => {
  const initialState = { message: null, formErrors: {} };
  const [state, dispatch] = useFormState(addTaskToProject, initialState);

  return (
    <TaskForm
      assginedToOptions={memberOptions}
      fromProject={project}
      state={state}
      onSubmit={dispatch}
    />
  );
};
