import { z } from 'zod';

// Constants
import { ProjectFormDataSchema } from '@/constants';

// Models
import { BaseEntity, CustomStateType, ResponseStateType } from './base';
import { User } from '@/types';

export type ProjectFormType = z.infer<typeof ProjectFormDataSchema>;

export type ProjectFormTypeWithMembers = ProjectFormType & { members: User[] };

export type ProjectFormState = {
  formErrors?: {
    title?: string[];
    description?: string[];
    isPublic?: string[];
    memberIds?: string[];
    image?: string[];
  };
} & CustomStateType &
  Partial<ResponseStateType<Project | null>>;

export type Project = BaseEntity & {
  isPublic: boolean;
};

export type EditProjetDataType = Omit<ProjectFormType, 'memberIds'> & {
  updatedAt: string;
};
