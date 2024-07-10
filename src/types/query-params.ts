export interface QueryParams {
  page?: number;
  order?: {
    field: string;
    type: 'asc' | 'desc';
  };
  limit?: number;
}

export interface SearchParams {
  page?: string;
  query?: string;
}
