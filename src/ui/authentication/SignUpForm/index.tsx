'use client';
import { useEffect, useMemo } from 'react';
import { Control, Controller, useForm } from 'react-hook-form';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState, useFormStatus } from 'react-dom';

// APIs
import { userSignUp } from '@/actions';

// Components
import { Button, Text, Input, InputPassword } from '@/components';

// Constants
import { ROUTES, UserSignupFormDataSchema } from '@/constants';

// Models
import { UserSignUp, UserSignUpState } from '@/models';

// Utils
import { cn, setServerActionErrors, isEnableSubmitButton } from '@/utils';

const REQUIRED_FIELDS = [
  'username',
  'email',
  'password',
  'passwordConfirmation',
];

const SignUpFormContent = ({
  control,
  state,
  isDisabled,
}: {
  control: Control<{
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }>;
  state: UserSignUpState;
  isDisabled: boolean;
}) => {
  const { pending } = useFormStatus();

  return (
    <div className="dark:text-white">
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
              disabled={pending}
              {...rest}
            />
            <span className={cn('bg-white', error?.message ? 'mb-2' : 'mb-8')}>
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
              disabled={pending}
              {...rest}
            />
            <span className={cn('bg-white', error?.message ? 'mb-2' : 'mb-8')}>
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
              disabled={pending}
              {...rest}
            />
            <span className={cn('bg-white', error?.message ? 'mb-2' : 'mb-8')}>
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
            <label className="font-bold text-md">Re-enter your password</label>
            <InputPassword
              placeholder="Re-enter your password here"
              value={value}
              onChange={onChange}
              customClass="py-5"
              disabled={pending}
              {...rest}
            />
            <span className={cn('bg-white', error?.message ? 'mb-2' : 'mb-8')}>
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

      <Button
        type="submit"
        customClass="w-full justify-center py-[19px] font-bold"
        disabled={isDisabled}
        isLoading={pending}
      >
        Sign Up
      </Button>
      <div className="flex flex-col mt-3">
        <span className={cn(state.responseMessage ? 'mb-2' : 'mb-8')}>
          {state.responseMessage && (
            <Text
              customClass="text-xs px-0 whitespace-pre"
              value={state.responseMessage}
              variant={state.success ? 'primary' : 'error'}
            />
          )}
        </span>
        <span>
          Have an account?&nbsp;
          <Link
            className="text-lg font-bold hover:text-blue-700 cursor-pointer"
            href={ROUTES.SIGN_IN}
          >
            Login Now
          </Link>
        </span>
      </div>
    </div>
  );
};

export const SignUpForm = () => {
  const signUpFormInitValues: UserSignUp = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const {
    control,
    setError,
    getValues,
    formState: { dirtyFields, errors },
  } = useForm<UserSignUp>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: signUpFormInitValues,
    resolver: zodResolver(UserSignupFormDataSchema),
  });

  const dirtyItems = Object.keys(dirtyFields);
  const isDisabled = useMemo(
    () => !isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors],
  );

  const initialState = { message: null, formErrors: {} };
  const [state, dispatch] = useFormState(userSignUp, initialState);

  useEffect(() => {
    state.formErrors && setServerActionErrors(state.formErrors, setError);
  }, [state.formErrors, setError]);

  const handleSubmit = () => {
    const formValues = getValues();
    dispatch(formValues);
  };
  return (
    <form action={handleSubmit}>
      <SignUpFormContent
        control={control}
        state={state}
        isDisabled={isDisabled}
      />
    </form>
  );
};
