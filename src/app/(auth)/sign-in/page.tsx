import { SignInForm } from '@/ui';

const SignInPage = () => {
  return (
    <main>
      <div className="pb-8 dark:text-white">
        <h1 className="font-bold text-[42px]">Welcome back!</h1>
        <h2 className="font-normal text-xs text-zinc-500">
          We can assign tasks, set deadlines, and track progress effortlessly.
        </h2>
      </div>
      <SignInForm />
    </main>
  );
};

export default SignInPage;
