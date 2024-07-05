import {
  DocumentSnapshot,
  OrderByDirection,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
} from 'firebase/firestore';

// DB
import { db } from '@/config';

// GET all documents of a collection
export const getDocuments = async <T>(
  collectionKey: string,
  orderItem: { field: string; type: OrderByDirection },
  limitItem?: number,
  startPoint?: DocumentSnapshot<T>,
) => {
  try {
    let dataQuery = query(collection(db, collectionKey));

    if (orderItem) {
      dataQuery = query(dataQuery, orderBy(orderItem.field, orderItem.type));
    }

    if (limitItem) {
      dataQuery = query(dataQuery, limit(limitItem));
    }

    if (startPoint) {
      dataQuery = query(dataQuery, startAfter(startPoint));
    }

    const snapshot = await getDocs(dataQuery);
    const getCount = await getCountFromServer(collection(db, collectionKey));
    const total = getCount.data().count;

    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as T[];

    return {
      data,
      error: null,
      total: total,
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

// Add new document
export const addDocument = async (
  collectionKey: string,
  formData: FormData,
) => {
  const docRef = collection(db, collectionKey);

  try {
    const addedItem = await addDoc(docRef, formData);

    return {
      success: true,
      data: {
        ...formData,
        id: addedItem.id,
      },
      error: null,
    };
  } catch (error) {
    error instanceof Error && {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

// GET details document by id
export const getDocument = async <T>(collectionKey: string, itemId: string) => {
  const dataQuery = query(collection(db, collectionKey, itemId));

  try {
    const snapshot = (await getDocs(dataQuery)).docs[0];

    return {
      data: { ...snapshot, id: snapshot.id } as T,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: 'Cannot get details of item',
    };
  }
};

export const updateDocument = async <T>(
  collectionKey: string,
  data: T & { id: string },
) => {
  const dataQuery = doc(db, collectionKey, data.id);

  await updateDoc(dataQuery, data);
};

export const deleteDocument = async (collectionKey: string, id: string) => {
  const dataQuery = doc(db, collectionKey, id);

  await deleteDoc(dataQuery);
};
