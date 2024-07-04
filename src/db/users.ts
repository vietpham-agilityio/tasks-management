'use server';
import { collection, getDocs } from 'firebase/firestore';

// Configs
import { db } from '@/config';

// Constants
import { COLLECTION } from '@/constants';

// Models
import { User } from '@/types';

export async function queryUserList(): Promise<{
  data: User[];
  error: string;
}> {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION.USERS));
    const userList: User[] = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      userList.push({
        ...doc.data(),
        id: doc.id,
        name: doc.data()?.username,
        email: doc.data()?.email,
      });
    });
    return {
      data: userList,
      error: '',
    };
  } catch (error) {
    return {
      data: [],
      error: (error as Error).message,
    };
  }
}
