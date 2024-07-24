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
    images: '/open-graph-image.webp',
  },
};

const SignUpPage = () => (
  <main className="w-full h-full bg-white dark:bg-zinc-800 rounded-lg">
    <div className="w-full lg:w-2/3 py-10 lg:py-20 px-10 mx-auto">
      <div className="pb-8 dark:text-white">
        <h1 className="font-bold text-4xl">Register Here!</h1>
        <h2 className="mt-2 font-normal text-xs md:text-lg text-zinc-500 dark:text-gray-300">
          We can assign tasks, set deadlines, and track progress effortlessly.
        </h2>
      </div>
      <SignUpForm />
    </div>
  </main>
);

export default SignUpPage;
