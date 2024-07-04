import { z } from 'zod';

// Constants
import {
  TASK_PRIORITY_VALUE,
  TASK_STATUS_VALUE,
  TaskFormDataSchema,
} from '@/constants';

// Models
import { BaseEntity, CustomStateType } from './base';

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

export type Task = BaseEntity & {
  dueDate: Date | string;
  status: TASK_STATUS_VALUE;
  priority: TASK_PRIORITY_VALUE;
  assignedTo: string;
  projectId: string;
};
