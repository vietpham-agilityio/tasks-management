import {
  DocumentData,
  QueryConstraint,
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

// Constants
import { ERROR_MESSAGES } from '@/constants';

// DB
import { db } from '@/config';

// Models
import { QueryParam } from '@/types';

// GET all documents of a collection
export const getDocuments = async <T>(
  collectionKey: string,
  queryParam?: QueryParam,
) => {
  try {
    let lastVisible;
    let queryConstraints: QueryConstraint[] = [];
    let countQueryConstraints: QueryConstraint[] = [];

    // TODO: Create a helper function to generate queryConstraint
    if (queryParam?.orderItem) {
      queryConstraints.push(
        orderBy(queryParam.orderItem.field, queryParam.orderItem.type),
      );
    }

    if (queryParam?.limitItem) {
      queryConstraints.push(limit(queryParam.limitItem));
    }

    if (queryParam?.query) {
      (countQueryConstraints = queryParam.query.map((element) =>
        where(element.field, element.comparison, element.value),
      )),
        (queryConstraints = queryConstraints.concat(countQueryConstraints));
    }

    if (queryParam?.page && queryParam?.limitItem && queryParam.orderItem) {
      if (queryParam.page > 1) {
        const lastDocs = await getDocs(
          query(
            collection(db, collectionKey),
            orderBy(queryParam?.orderItem!.field, queryParam?.orderItem!.type),
            limit(queryParam.limitItem * (queryParam.page - 1)),
          ),
        );
        // Get the query cursor
        lastVisible = lastDocs.docs[lastDocs.docs.length - 1];
        queryConstraints.push(startAfter(lastVisible));
      }
    }

    const dataQuery = query(collection(db, collectionKey), ...queryConstraints);
    const snapshot = await getDocs(dataQuery);
    const getCount = await getCountFromServer(
      query(collection(db, collectionKey), ...countQueryConstraints),
    );
    const total = getCount.data().count;

    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as T[];

    return {
      success: true,
      data,
      total: total,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        data: [],
        error: error.message,
      };
    }

    return {
      success: false,
      data: [],
      error: ERROR_MESSAGES.REQUESTING_DATA,
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
        success: true,
        data: { ...snapshot.data(), id: snapshot.id } as T,
      };
    }
    return {
      success: false,
      data: null,
      error: ERROR_MESSAGES.DATA_NOT_FOUND,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: ERROR_MESSAGES.REQUESTING_DATA,
    };
  }
};

export const updateDocument = async <T>(
  collectionKey: string,
  formData: T & WithFieldValue<DocumentData>,
) => {
  const dataQuery = doc(db, collectionKey, formData.id);
  try {
    const updatedItem = await updateDoc(dataQuery, formData);
    return {
      success: true,
      data: updatedItem,
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
  try {
    const dataQuery = doc(db, collectionKey, id);

    await deleteDoc(dataQuery);
    return {
      success: true,
    };
  } catch (error) {
    error instanceof Error && {
      success: false,
      error: error.message,
    };
  }
};
