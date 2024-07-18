import { redirect } from 'next/navigation';

// Auth
import { auth } from '@/auth';

// Constants
import { ROUTES } from '@/constants';

const Homepage = async () => {
  const session = await auth();

  if (session) {
    redirect(ROUTES.ADMIN_BOARDS);
  } else {
    redirect(ROUTES.BOARDS);
  }
};

export default Homepage;
