import { Metadata } from 'next';

// Constants
import { METADATA_CONTENT, ROUTES } from '@/constants';

// Components
import { SignUpForm } from '@/ui';

const BASE_URL = process.env.NEXT_PUBLIC_URL;

const { TITLE, DESC } = METADATA_CONTENT.SIGN_UP;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${BASE_URL}${ROUTES.SIGN_UP}`,
    images: [
      {
        url: '/Opengraph/open-graph-sign-up.png',
        width: 1200,
        height: 630,
        alt: DESC,
      },
    ],
  },
};

const SignUpPage = () => (
  <main>
    <div className="pb-8 dark:text-white">
      <h1 className="font-bold text-4xl">Register Here!</h1>
      <h2 className="mt-2 font-normal text-xs md:text-lg text-zinc-500 dark:text-gray-300">
        We can assign tasks, set deadlines, and track progress effortlessly.
      </h2>
    </div>
    <SignUpForm />
  </main>
);

export default SignUpPage;
