import {
  DocumentData,
  WithFieldValue,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';

// DB
import { db } from '@/config';

// Models
import { QueryParam } from '@/models';

// GET all documents of a collection
export const getDocuments = async <T>(
  collectionKey: string,
  queryParam?: QueryParam<T>,
) => {
  try {
    let dataQuery = query(collection(db, collectionKey));

    // TODO: Create a helper function to generate queryConstraint
    if (queryParam?.orderItem) {
      dataQuery = query(
        dataQuery,
        orderBy(queryParam?.orderItem.field, queryParam?.orderItem.type),
      );
    }
    if (queryParam?.limitItem) {
      dataQuery = query(dataQuery, limit(queryParam?.limitItem));
    }
    if (queryParam?.startPoint) {
      dataQuery = query(dataQuery, startAfter(queryParam?.startPoint));
    }
    if (queryParam?.query) {
      dataQuery = query(
        dataQuery,
        where(
          queryParam?.query.field,
          queryParam?.query.comparison,
          queryParam?.query.value,
        ),
      );
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
export const addDocument = async <T>(
  collectionKey: string,
  formData: T & WithFieldValue<DocumentData>,
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
  const dataQuery = doc(db, collectionKey, itemId);
  try {
    const snapshot = await getDoc(dataQuery);
    if (snapshot.exists()) {
      return {
        data: { ...snapshot.data(), id: snapshot.id } as T,
      };
    }
  } catch (error) {
    return {
      data: null,
      error: 'Cannot get details of item',
    };
  }
};

export const updateDocument = async <T>(
  collectionKey: string,
  formData: T & WithFieldValue<DocumentData>,
) => {
  const dataQuery = doc(db, collectionKey, formData.id);
  try {
    const ItemUpdated = await updateDoc(dataQuery, formData);
    return {
      success: true,
      data: {
        ItemUpdated,
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

export const deleteDocument = async (collectionKey: string, id: string) => {
  const dataQuery = doc(db, collectionKey, id);

  await deleteDoc(dataQuery);
};
