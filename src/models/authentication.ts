import { z } from 'zod';

// Constants
import {
  UserSigninFormDataSchema,
  UserSignupFormDataSchema,
} from '@/constants';

export type CustomStateType = {
  success?: boolean;
};

export type UserSignin = z.infer<typeof UserSigninFormDataSchema>;

export type UserSigninState = {
  errors?: {
    username?: string[];
    password?: string[];
  };
} & CustomStateType;

export type UserSignUp = z.infer<typeof UserSignupFormDataSchema>;

export type UserSignUpState = {
  errors?: {
    password?: string[];
    passwordConfirmation?: string[];
  };
} & UserSigninState &
  CustomStateType;
