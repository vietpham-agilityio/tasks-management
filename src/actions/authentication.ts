'use server';

import { redirect } from 'next/navigation';
import { auth, db } from '@/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// Constants
import {
  COLLECTION,
  ERROR_CODE,
  ROUTES,
  UserSigninFormDataSchema,
  UserSignupFormDataSchema,
} from '@/constants';

// Models
import { UserSignUp, UserSignUpState, UserSigninState } from '@/models';

export async function userSignIn(
  prevState: UserSigninState,
  formData: FormData,
) {
  const validators = UserSigninFormDataSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  let result: UserSigninState = {};

  if (validators.success) {
    result = { success: true };
  }

  if (validators.error) {
    result = { success: false, errors: validators.error.flatten().fieldErrors };
  }

  return result;
}

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
        auth,
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
