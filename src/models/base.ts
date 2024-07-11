export type CustomStateType = {
  success?: boolean;
};

export type ResponseStateType<T> = {
  success?: boolean;
  error?: string;
  data: T;
  total?: number;
};

export type BaseEntity = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  isArchived: boolean;
  createdBy: string;
};

export type CacheOption = {
  keyParts?: string[];
  options?: {
    tags?: string[];
  };
};
