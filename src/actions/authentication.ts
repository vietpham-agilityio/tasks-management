'use server';

import { redirect } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// Configs
import { firebaseAuth, db } from '@/config';

// Constants
import {
  COLLECTION,
  ERROR_CODE,
  ROUTES,
  UserSignupFormDataSchema,
} from '@/constants';

// Models
import { UserSignUp, UserSignUpState } from '@/models';

export async function userSignUp(
  prevState: UserSignUpState,
  formData: UserSignUp,
) {
  const validators = UserSignupFormDataSchema.safeParse(formData);

  let result: UserSignUpState = {};

  if (validators.success) {
    const { username, email, password } = validators.data;

    try {
      const credential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );

      await setDoc(doc(db, COLLECTION.USERS, credential.user.uid), {
        username,
        email,
      });

      result = { success: true };
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes(ERROR_CODE.EMAIL_EXIST)
      ) {
        result = {
          success: false,
          responseMessage: 'Email already existed!',
        };
      } else {
        result = {
          success: false,
          responseMessage: 'Something went wrong!',
        };
      }
    }

    if (result.success) {
      redirect(ROUTES.SIGN_IN);
    }
  }

  if (validators.error) {
    result = {
      success: false,
      formErrors: validators.error.flatten().fieldErrors,
    };
  }

  return result;
}
