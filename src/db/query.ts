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

// Constants
import { ERROR_MESSAGES } from '@/constants';

// DB
import { db } from '@/config';

// Models
import { QueryParam } from '@/models';

// GET all documents of a collection
export const getDocuments = async <T>(
  collectionKey: string,
  queryParam?: QueryParam,
) => {
  try {
    let dataQuery = query(collection(db, collectionKey));
    let lastVisible;

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

        dataQuery = query(dataQuery, startAfter(lastVisible));
      } else {
        dataQuery = query(dataQuery);
      }
    }

    const snapshot = await getDocs(dataQuery);
    const getCount = await getCountFromServer(collection(db, collectionKey));
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
  const dataQuery = doc(db, collectionKey, id);

  await deleteDoc(dataQuery);
};
