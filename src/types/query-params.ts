import { OrderByDirection, WhereFilterOp } from 'firebase/firestore';

export type QueryParam = {
  orderItem?: { field: string; type: OrderByDirection };
  query?: {
    field: string;
    comparison: WhereFilterOp;
    value: string | string[];
  }[];
  limitItem?: number;
  page?: number;
};

export interface SearchParams {
  page?: string;
  query?: string;
}
