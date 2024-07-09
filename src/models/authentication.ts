import { z } from 'zod';

// Constants
import {
  UserSigninFormDataSchema,
  UserSignupFormDataSchema,
} from '@/constants';

// Models
import { CustomStateType } from './base';

export type UserSignin = z.infer<typeof UserSigninFormDataSchema>;

export type UserSigninState = {
  formErrors?: {
    username?: string[];
    password?: string[];
  };
  responseMessage?: string;
} & CustomStateType;

export type UserSignUp = z.infer<typeof UserSignupFormDataSchema>;

export type UserSignUpState = {
  formErrors?: {
    password?: string[];
    passwordConfirmation?: string[];
  };
  responseMessage?: string;
} & UserSigninState &
  CustomStateType;
