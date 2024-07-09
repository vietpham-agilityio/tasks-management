'use client';

import { useFormState } from 'react-dom';

// APIs
import { createProjectWithParticipants } from '@/actions';

// Components
import { ProjectForm } from '../ProjectForm';

// Models
import { User } from '@/types';

type CreateProjectFormWrapperProps = {
  memberOptions: User[];
};

export const CreateProjectFormWrapper = ({
  memberOptions,
}: CreateProjectFormWrapperProps) => {
  const initialState = { message: null, formErrors: {} };
  const [state, dispatch] = useFormState(
    createProjectWithParticipants,
    initialState,
  );

  return (
    <ProjectForm
      memberOptions={memberOptions}
      onSubmit={dispatch}
      state={state}
    />
  );
};
