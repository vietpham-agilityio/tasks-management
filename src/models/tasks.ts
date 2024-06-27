import { z } from 'zod';

// Constants
import { TaskFormDataSchema } from '@/constants';

// Models
import { CustomStateType } from './authentication';

export type TaskFormType = z.infer<typeof TaskFormDataSchema>;

export type TaskFormState = {
  errors?: {
    title?: string[];
    status?: string[];
    description?: string[];
    dueDate?: string[];
    priority?: string[];
    assignedTo?: string[];
    image?: string[];
  };
} & CustomStateType;
