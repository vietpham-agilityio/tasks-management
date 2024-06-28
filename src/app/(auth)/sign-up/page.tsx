import { SignUpForm } from '@/ui';

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
