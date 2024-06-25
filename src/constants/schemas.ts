import { z } from 'zod';

// Constants
import { ERROR_MESSAGES } from './messages';
import { isRequired, isValidFormat } from '../utils/validators';
import { MIN_LENGTH, REGEX_EMAIL } from './validators';

export const UserSigninFormDataSchema = z.object({
  username: z.string().refine(isRequired, ERROR_MESSAGES.FIELD_REQUIRED),
  password: z.string().refine(isRequired, ERROR_MESSAGES.FIELD_REQUIRED),
});

export const UserSignupFormDataSchema = z
  .object({
    username: z
      .string()
      .min(
        MIN_LENGTH.USERNAME,
        ERROR_MESSAGES.MIN_LENGTH('Username', MIN_LENGTH.USERNAME),
      ),
    email: z
      .string()
      .min(1, ERROR_MESSAGES.FIELD_REQUIRED)
      .refine(
        (value) => isValidFormat(value, REGEX_EMAIL),
        ERROR_MESSAGES.FORMAT('Email'),
      ),
    password: z
      .string()
      .min(
        MIN_LENGTH.PASSWORD,
        ERROR_MESSAGES.MIN_LENGTH('Password', MIN_LENGTH.PASSWORD),
      ),
    passwordConfirmation: z
      .string()
      .refine(isRequired, ERROR_MESSAGES.FIELD_REQUIRED),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: ERROR_MESSAGES.PASSWORD_NOT_MATCH,
    path: ['passwordConfirmation'],
  });
