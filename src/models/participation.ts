import { z } from 'zod';

// Constants
import { ParticipationFormDataSchema } from '@/constants';

// Types
import { CustomStateType, ResponseStateType } from './base';

export type Participation = {
  userId: string;
  projectId: string;
  createdAt: string;
  isArchived: boolean;
  username?: string;
  avatar?: string;
};

export type ParticipationFormType = z.infer<typeof ParticipationFormDataSchema>;

export type ParticipationFormState = {
  formErrors?: {
    members?: string[];
  };
} & CustomStateType &
  Partial<ResponseStateType<null>>;
