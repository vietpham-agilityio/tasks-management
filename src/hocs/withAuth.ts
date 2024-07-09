'use server';
import { Session } from 'next-auth';

// Auth
import { auth } from '@/auth';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Utils
import { isEmpty } from '@/utils';

export const withAuth = async <T, H>(
  childFunction: (args: T, session: Session | null) => Promise<H>,
  args: T,
  checkAuthenticated = true,
) => {
  const session = await auth();

  if (checkAuthenticated && isEmpty(session)) {
    return {
      success: false,
      error: ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
    };
  }
  const response = await childFunction(args, session);
  return response;
};
