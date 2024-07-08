import { z } from 'zod';

// Constants
import {
  TASK_PRIORITY_VALUE,
  TASK_STATUS_VALUE,
  TaskFormDataSchema,
} from '@/constants';

// Models
import { BaseEntity, CustomResponseType, CustomStateType } from './base';

export type TaskFormType = z.infer<typeof TaskFormDataSchema>;

export type TaskFormState = {
  errors?: {
    title?: string[];
    slug?: string[];
    status?: string[];
    description?: string[];
    dueDate?: string[];
    priority?: string[];
    assignedTo?: string[];
    projectId?: string[];
    image?: string[];
  };
} & CustomStateType &
  CustomResponseType<void>;

export type Task = BaseEntity & {
  slug: string;
  dueDate: Date;
  status: TASK_STATUS_VALUE;
  priority: TASK_PRIORITY_VALUE;
  assignedTo: string;
  projectId: string;
};
