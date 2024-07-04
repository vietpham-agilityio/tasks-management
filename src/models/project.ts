import { z } from 'zod';

// Constants
import { ProjectFormDataSchema } from '@/constants';

// Models
import { CustomResponseType, CustomStateType } from './base';

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
  CustomResponseType<void>;

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  isArchived: boolean;
  isPublic: boolean;
  createdBy: string;
};
