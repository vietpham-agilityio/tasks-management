import Link from 'next/link';

// Auths
import { auth } from '@/auth';

// Constants
import { ROUTES } from '@/constants';

// Icons
import { PiWarningOctagon } from 'react-icons/pi';

export default async function NotFound() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center gap-12 mt-24">
      <PiWarningOctagon className="w-40 h-40 md:h-80 md:w-80 text-amber-400" />

      <h1 className="font-bold text-3xl">Not Found</h1>
      <h2 className="text-md md:text-xl">
        Could not find the requested resource.
      </h2>

      <Link
        className="text-blue-500 hover:text-blue-700 text-md md:text-xl"
        aria-label="Homepage"
        href={session ? ROUTES.ADMIN_BOARDS : ROUTES.BOARDS}
      >
        ← Go to Homepage
      </Link>
    </div>
  );
}
