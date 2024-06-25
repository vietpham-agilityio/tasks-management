'use client';
import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState } from 'react-dom';

// APIs
import { userSignIn } from '@/actions';

// Components
import { Button, Text, Input, InputPassword } from '@/components';

// Constants
import { ROUTES, UserSigninFormDataSchema } from '@/constants';

// Models
import { UserLogin } from '@/models';

// Utils
import { cn, setServerActionErrors, isEnableSubmitButton } from '@/utils';

const REQUIRED_FIELDS = ['username', 'password'];

export const SignInForm = () => {
  const loginFormInitValues: UserLogin = {
    username: '',
    password: '',
  };

  const {
    control,
    setError,
    formState: { dirtyFields, errors },
  } = useForm<UserLogin>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: loginFormInitValues,
    resolver: zodResolver(UserSigninFormDataSchema),
  });

  const dirtyItems = Object.keys(dirtyFields);
  const isDisabled = useMemo(
    () => !isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors],
  );

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(userSignIn, initialState);

  useEffect(() => {
    state.errors && setServerActionErrors(state.errors, setError);
  }, [state.errors, setError]);

  return (
    <form className="dark:text-white" action={dispatch}>
      <div>
        <Controller
          name="username"
          control={control}
          render={({
            field: { onChange, value, ...rest },
            fieldState: { error },
          }) => (
            <div className="flex flex-col gap-2">
              <label className="font-bold text-md">Username</label>
              <Input
                placeholder="Input your username here"
                value={value}
                onChange={(value) => {
                  onChange(value);
                }}
                customClass="py-5"
                {...rest}
              />
              <span
                className={cn('bg-white', error?.message ? 'mb-2' : 'mb-8')}
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
                customClass="py-5"
                {...rest}
              />
              <span
                className={cn('bg-white', error?.message ? 'mb-2' : 'mb-8')}
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
      </div>

      <Link
        className="text-base font-normal hover:text-blue-700 cursor-pointer"
        href={ROUTES.FORGET_PASSWORD}
      >
        Forgot password?
      </Link>
      <Button
        type="submit"
        customClass="w-full justify-center py-[19px] font-bold my-8"
        disabled={isDisabled}
      >
        Sign In
      </Button>
      <span>
        Don&apos;t have an account?&nbsp;
        <Link
          className="text-lg font-bold hover:text-blue-700 cursor-pointer"
          href={ROUTES.SIGN_UP}
        >
          Create Account
        </Link>
      </span>
    </form>
  );
};
