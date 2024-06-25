'use client';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState } from 'react-dom';

// APIs
import { userSignUp } from '@/actions';

// Components
import { Button, Text, Input, InputPassword } from '@/components';

// Constants
import { ROUTES, UserSignupFormDataSchema } from '@/constants';

// Models
import { UserSignUp } from '@/models';

// Utils
import { cn, setServerActionErrors, isEnableSubmitButton } from '@/utils';

const REQUIRED_FIELDS = [
  'username',
  'email',
  'password',
  'passwordConfirmation',
];

export const SignUpForm = () => {
  const signupFormInitValues: UserSignUp = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const {
    control,
    setError,
    formState: { dirtyFields, errors },
  } = useForm<UserSignUp>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: signupFormInitValues,
    resolver: zodResolver(UserSignupFormDataSchema),
  });

  const dirtyItems = Object.keys(dirtyFields);
  const isDisabled = useMemo(
    () => !isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors],
  );

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(userSignUp, initialState);

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
        <Controller
          name="passwordConfirmation"
          control={control}
          render={({
            field: { onChange, value, ...rest },
            fieldState: { error },
          }) => (
            <div className="flex flex-col gap-2">
              <label className="font-bold text-md">
                Re-enter your password
              </label>
              <InputPassword
                placeholder="Re-enter your password here"
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

      <Button
        type="submit"
        customClass="w-full justify-center py-[19px] font-bold my-8"
        disabled={isDisabled}
      >
        Sign Up
      </Button>
      <span>
        Have an account?&nbsp;
        <Link
          className="text-lg font-bold hover:text-blue-700 cursor-pointer"
          href={ROUTES.SIGN_IN}
        >
          Login Now
        </Link>
      </span>
    </form>
  );
};
