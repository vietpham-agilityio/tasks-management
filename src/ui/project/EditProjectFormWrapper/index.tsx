'use client';

import { useFormState } from 'react-dom';

// APIs
import { updateProjectWithParticipants } from '@/actions';

// Components
import { ProjectForm } from '../ProjectForm';

// Models
import { User } from '@/types';
import { Project } from '@/models';

type EditProjectFormWrapperProps = {
  memberOptions: User[];
  participations: string[];
  data: Project;
};

export const EditProjectFormWrapper = ({
  data,
  participations,
  memberOptions,
}: EditProjectFormWrapperProps) => {
  const initialState = { message: null, errors: {} };
  const updateProjectWithParticipantsWithId =
    updateProjectWithParticipants.bind(null, data.id);
  const [state, dispatch] = useFormState(
    updateProjectWithParticipantsWithId,
    initialState,
  );

  return (
    <ProjectForm
      memberOptions={memberOptions}
      onSubmit={dispatch}
      state={state}
      projectValue={data}
      participations={participations}
    />
  );
};
