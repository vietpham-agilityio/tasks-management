import { z } from 'zod';

// Constants
import { ParticipationFormDataSchema } from '@/constants';

// Types
import { CustomStateType, ResponseStateType } from './base';
import { User } from '@/types';

export type Participation = {
  userId: string;
  projectId: string;
  createdAt: string;
  name: string;
  avatar?: string;
};

export type ParticipationFormType = z.infer<typeof ParticipationFormDataSchema>;

export type ParticipationFormTypeWithMembers = ParticipationFormType & {
  members: User[];
};

export type ParticipationFormState = {
  formErrors?: {
    memberIds?: string[];
  };
} & CustomStateType &
  Partial<ResponseStateType<null>>;
