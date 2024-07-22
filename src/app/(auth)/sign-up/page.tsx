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
  },
};

const SignUpPage = () => (
  <main>
    <div className="pb-8 dark:text-white">
      <h1 className="font-bold text-[42px]">Register Here!</h1>
      <h2 className="font-normal text-xs text-zinc-500">
        We can assign tasks, set deadlines, and track progress effortlessly.
      </h2>
    </div>
    <SignUpForm />
  </main>
);

export default SignUpPage;
