'use server';
// Constants
import {
  UserSigninFormDataSchema,
  UserSignupFormDataSchema,
} from '@/constants';

// Models
import { UserSignUpState, UserSigninState } from '@/models';

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
  formData: FormData,
) {
  const validators = UserSignupFormDataSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    passwordConfirmation: formData.get('passwordConfirmation'),
  });

  let result: UserSignUpState = {};

  if (validators.success) {
    result = { success: true };
  }

  if (validators.error) {
    result = { success: false, errors: validators.error.flatten().fieldErrors };
  }

  return result;
}
