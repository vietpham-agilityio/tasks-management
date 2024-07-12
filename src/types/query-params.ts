import { OrderByDirection, WhereFilterOp } from 'firebase/firestore';

// constants
import { ORDER_TYPES } from '@/constants';

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
  sortBy?: ORDER_TYPES;
}
