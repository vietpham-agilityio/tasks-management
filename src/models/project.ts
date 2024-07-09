import { z } from 'zod';

// Constants
import { ProjectFormDataSchema } from '@/constants';

// Models
import { BaseEntity, CustomStateType, ResponseStateType } from './base';

export type ProjectFormType = z.infer<typeof ProjectFormDataSchema>;

export type ProjectFormState = {
  formErrors?: {
    title?: string[];
    description?: string[];
    isPublic?: string[];
    members?: string[];
    image?: string[];
  };
} & CustomStateType &
  ResponseStateType<Project>;

export type Project = BaseEntity & {
  isPublic: boolean;
};

export type EditProjetDataType = Omit<ProjectFormType, 'members'> & {
  updatedAt: string;
};
