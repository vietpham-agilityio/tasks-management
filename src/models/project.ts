import { z } from 'zod';

// Constants
import { ProjectFormDataSchema } from '@/constants';

// Models
import { CustomStateType } from './authentication';

export type ProjectFormType = z.infer<typeof ProjectFormDataSchema>;

export type ProjectFormState = {
  errors?: {
    title?: string[];
    description?: string[];
    isPublic?: string[];
    members?: string[];
    image?: string[];
  };
} & CustomStateType;
