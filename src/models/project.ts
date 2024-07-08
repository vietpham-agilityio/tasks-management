import { z } from 'zod';

// Constants
import { ProjectFormDataSchema } from '@/constants';

// Models
import { BaseEntity, CustomResponseType, CustomStateType } from './base';

export type ProjectFormType = z.infer<typeof ProjectFormDataSchema>;

export type ProjectFormState = {
  errors?: {
    title?: string[];
    description?: string[];
    isPublic?: string[];
    members?: string[];
    image?: string[];
  };
} & CustomStateType &
  CustomResponseType<Project>;

export type Project = BaseEntity & {
  isPublic: boolean;
};

export type EditProjetDataType = Omit<ProjectFormType, 'members'> & {
  updatedAt: string;
};
