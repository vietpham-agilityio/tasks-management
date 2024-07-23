'use client';
import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

// Components
import { Button, Text, Input, InputPassword } from '@/components';

// Constants
import {
  ERROR_MESSAGES,
  QUERY_PARAMS,
  ROUTES,
  SUCCESS_MESSAGES,
  UserSigninFormDataSchema,
} from '@/constants';

// HOCs
import { TWithToast, withToast } from '@/hocs';

// Models
import { UserSignin } from '@/models';

// Utils
import { cn, isEnableSubmitButton } from '@/utils';

const REQUIRED_FIELDS = ['email', 'password'];

export const SignInFormBase = ({ openToast }: TWithToast<object>) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get(QUERY_PARAMS.CALLBACK_URL);

  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [isLoading, setLoading] = useState(false);

  const signinFormInitValues: UserSignin = {
    email: '',
    password: '',
  };

  const {
    control,
    getValues,
    formState: { dirtyFields, errors },
  } = useForm<UserSignin>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: signinFormInitValues,
    resolver: zodResolver(UserSigninFormDataSchema),
  });

  const dirtyItems = Object.keys(dirtyFields);
  const isDisabled = useMemo(
    () => !isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors],
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await signIn('credentials', {
        redirect: false,
        ...getValues(),
      });
      setLoading(false);
      if (response?.error) {
        setError(ERROR_MESSAGES.USER_NOT_FOUND);
        return;
      }
      openToast({
        variant: 'success',
        message: SUCCESS_MESSAGES.SIGNED_IN,
      });
      router.push(callbackUrl || ROUTES.ADMIN_BOARDS);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Controller
          name="email"
          control={control}
          render={({
            field: { onChange, value, ...rest },
            fieldState: { error },
          }) => (
            <div className="flex flex-col gap-2">
              <label className="font-bold text-md">Email</label>
              <Input
                placeholder="Input your email here"
                value={value}
                onChange={(value) => {
                  onChange(value);
                }}
                customClass="py-5"
                disabled={isLoading}
                {...rest}
              />
              <span
                className={cn(
                  'bg-transparent',
                  error?.message ? 'mb-2' : 'mb-8',
                )}
              >
                {error?.message && (
                  <Text
                    customClass="text-xs px-0 whitespace-pre"
                    value={error?.message}
                    variant="error"
                  />
                )}
              </span>
            </div>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({
            field: { onChange, value, ...rest },
            fieldState: { error },
          }) => (
            <div className="flex flex-col gap-2">
              <label className="font-bold text-md">Password</label>
              <InputPassword
                placeholder="Input password here"
                value={value}
                onChange={onChange}
                disabled={isLoading}
                customClass="py-5"
                {...rest}
              />
              <span
                className={cn(
                  'bg-transparent',
                  error?.message ? 'mb-2' : 'mb-8',
                )}
              >
                {error?.message && (
                  <Text
                    customClass="text-xs px-0 whitespace-pre"
                    value={error?.message}
                    variant="error"
                  />
                )}
              </span>
            </div>
          )}
        />

        <Link
          className="text-base font-normal hover:text-blue-700 cursor-pointer"
          href="#"
        >
          Forgot password?
        </Link>
        <Button
          type="submit"
          customClass="w-full justify-center py-[19px] font-bold my-8"
          disabled={isDisabled}
          isLoading={isLoading}
        >
          Sign In
        </Button>
        <div className="flex flex-col mt-3">
          <span className={cn(error ? 'mb-2' : 'mb-8')}>
            {error && (
              <Text
                customClass="text-xs px-0 whitespace-pre"
                value={error}
                variant="error"
              />
            )}
          </span>
          <span>
            Don&apos;t have an account?&nbsp;
            <Link
              className="text-lg font-bold hover:text-blue-700 cursor-pointer"
              href={ROUTES.SIGN_UP}
            >
              Create Account
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
};

export const SignInForm = withToast(SignInFormBase);
