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
) => {
  const session = await auth();

  if (isEmpty(session)) {
    return {
      success: false,
      response: { error: ERROR_MESSAGES.UNAUTHORIZED_ACCESS },
    };
  }
  const response = await childFunction(args, session);
  return response;
};
