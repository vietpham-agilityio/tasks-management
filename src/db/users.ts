'use server';
import { collection, getDocs } from 'firebase/firestore';

// Configs
import { db } from '@/config';

// Constants
import { COLLECTION } from '@/constants';

// Models
import { User } from '@/types';
import { ResponseStateType } from '@/models';

export async function queryUserList(): Promise<ResponseStateType<User[]>> {
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
      success: true,
      data: userList,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      error: (error as Error).message,
    };
  }
}
