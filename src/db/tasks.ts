import {
  QueryConstraint,
  collection,
  getCountFromServer,
  query,
  where,
} from 'firebase/firestore';

// DB
import { db } from '@/config';

// Constants
import { COLLECTION, QUERY_PARAMS } from '@/constants';

// Models
import { ResponseStateType } from '@/models';

export const countTaskByType = async (
  field: string,
  value: string,
  userId?: string,
): Promise<ResponseStateType<string | null>> => {
  try {
    const queryConstraints: QueryConstraint[] = [];
    queryConstraints.push(where(field, '==', value));
    userId &&
      queryConstraints.push(where(QUERY_PARAMS.ASSIGNED_TO, '==', userId));
    const getQuery = query(
      collection(db, COLLECTION.TASKS),
      ...queryConstraints,
    );
    const getCount = await getCountFromServer(getQuery);
    return {
      success: true,
      data: value,
      total: getCount.data().count,
    };
  } catch (error) {
    return {
      success: false,
      data: value,
      total: 0,
      error: (error as Error).message,
    };
  }
};
