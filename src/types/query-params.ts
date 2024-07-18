import { OrderByDirection, WhereFilterOp } from 'firebase/firestore';

// constants
import {
  ORDER_TYPES,
  TASK_PRIORITY_VALUE,
  TASK_STATUS_VALUE,
} from '@/constants';

export type QueryFilter = {
  field: string;
  comparison: WhereFilterOp;
  value: string | string[] | boolean;
};

export type QueryParam = {
  orderItem?: { field: string; type: OrderByDirection };
  query?: QueryFilter[];
  limitItem?: number;
  page?: number;
};

export interface SearchParams {
  page?: string;
  query?: string;
  sortBy?: ORDER_TYPES;
  status?: TASK_STATUS_VALUE;
  priority?: TASK_PRIORITY_VALUE;
  projectId?: string;
  userId?: string;
}
