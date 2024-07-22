import { Suspense } from 'react';
import { Metadata } from 'next';

// Constants
import { METADATA_CONTENT, ROUTES } from '@/constants';

// Components
import { SignInForm } from '@/ui';

const BASE_URL = process.env.NEXT_PUBLIC_URL;

const { TITLE, DESC } = METADATA_CONTENT.SIGN_IN;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${BASE_URL}${ROUTES.SIGN_IN}`,
  },
};

const SignInPage = () => (
  <main>
    <div className="pb-8 dark:text-white">
      <h1 className="font-bold text-[42px]">Welcome back!</h1>
      <h2 className="font-normal text-xs text-zinc-500">
        We can assign tasks, set deadlines, and track progress effortlessly.
      </h2>
    </div>
    {/* // TODO: Add skeleton */}
    <Suspense>
      <SignInForm />
    </Suspense>
  </main>
);

export default SignInPage;
