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
    images: [
      {
        url: '/Opengraph/open-graph-sign-in.png',
        width: 1200,
        height: 630,
        alt: DESC,
      },
    ],
    type: 'website',
  },
};

const SignInPage = () => (
  <main>
    <div className="pb-8 dark:text-white">
      <h1 className="font-bold text-4xl">Welcome back!</h1>
      <h2 className="mt-2 font-normal text-xs md:text-lg text-zinc-500 dark:text-gray-300">
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
