// DB
import { db } from '@/config';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';

export const getDataFromFirestore = async <T>(
  collectionKey: string,
  limitItem: number,
) => {
  const collectionItem = collection(db, collectionKey);
  const querySnapshot = query(
    collectionItem,
    orderBy('updatedAt', 'desc'),
    limit(limitItem),
    // TODO: Handle pagination
  );

  try {
    const docData = await getDocs(querySnapshot);
    const data = docData.docs.map((doc) => {
      return { ...(doc.data() as T), id: doc.id };
    });

    return {
      data,
      error: null,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
      };
    }

    return {
      data: null,
      error: 'Something went wrong!',
    };
  }
};
