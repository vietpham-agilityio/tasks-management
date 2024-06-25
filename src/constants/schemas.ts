import { z } from 'zod';

// Constants
import { ERROR_MESSAGES } from './messages';

export const UserSigninFormDataSchema = z.object({
  username: z.string().min(1, ERROR_MESSAGES.FIELD_REQUIRED),
  password: z.string().min(1, ERROR_MESSAGES.FIELD_REQUIRED),
});
