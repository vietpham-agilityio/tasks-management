'use server';
// Constants
import { UserSigninFormDataSchema } from '@/constants';

// Models
import { UserLoginState } from '@/models';

export async function userSignIn(
  prevState: UserLoginState,
  formData: FormData,
) {
  const validators = UserSigninFormDataSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  let result: UserLoginState = {};

  if (validators.success) {
    result = { success: true };
  }

  if (validators.error) {
    result = { success: false, errors: validators.error.flatten().fieldErrors };
  }

  return result;
}
