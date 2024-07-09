'use client';
import { useEffect, useMemo } from 'react';
import { useFormStatus } from 'react-dom';
import { Control, Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Components
import { Button, Checkbox, Input, MultipleSelect, Text } from '@/components';

// Constants
import { ProjectFormDataSchema } from '@/constants';

// Models
import { Project, ProjectFormState, ProjectFormType } from '@/models';
import { User } from '@/types';

// Utils
import {
  cn,
  isEmpty,
  isEnableSubmitButton,
  setServerActionErrors,
} from '@/utils';

const DEFAULT_REQUIRED_FIELDS = ['title', 'description', 'members'];

type ProjectFormProps = {
  memberOptions: User[];
  state: ProjectFormState;
  projectValue?: Project;
  participations?: string[];
  onSubmit: (formValues: ProjectFormType) => void;
};

const ProjectFormContent = ({
  memberOptions,
  control,
  responseMessage,
  isDisabled,
  isCreated,
}: {
  memberOptions: User[];
  control: Control<{
    title: string;
    isPublic: boolean;
    description: string;
    members: string[];
    image?: string | undefined;
  }>;
  responseMessage?: string;
  isDisabled: boolean;
  isCreated?: boolean;
}) => {
  const { pending } = useFormStatus();

  return (
    <div>
      <Controller
        name="title"
        control={control}
        render={({
          field: { onChange, value, ...rest },
          fieldState: { error },
        }) => (
          <div className="flex flex-col gap-2">
            <label className="font-bold text-md">Title</label>
            <Input
              placeholder="Title"
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
        name="description"
        control={control}
        render={({
          field: { onChange, value, ...rest },
          fieldState: { error },
        }) => (
          <div className="flex flex-col gap-2">
            <label className="font-bold text-md">Description</label>
            <Input
              placeholder="Description"
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
        name="members"
        control={control}
        render={({
          field: { onChange, value, onBlur },
          fieldState: { error },
        }) => (
          <div className="flex flex-col gap-2">
            <label className="font-bold text-md">Members</label>

            <MultipleSelect
              onChange={(value) => {
                onChange(value);
              }}
              options={memberOptions.map((member) => ({
                name: member.name,
                value: member.id,
              }))}
              selectedOptions={value}
              disabled={pending}
              onBlur={onBlur}
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
        name="image"
        control={control}
        render={({
          field: { onChange, value, ...rest },
          fieldState: { error },
        }) => (
          <div className="flex flex-col gap-2">
            <label className="font-bold text-md">Image</label>
            <Input
              placeholder="Image"
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
        name="isPublic"
        control={control}
        render={({
          field: { onChange, value, ...rest },
          fieldState: { error },
        }) => (
          <div className="flex flex-col gap-2">
            <Checkbox
              className="w-7 h-7"
              label="Public Project"
              checked={value}
              onChange={(e) => {
                onChange(e.target.checked);
              }}
              customClass={{
                label: 'text-md',
              }}
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
        customClass="w-full justify-center py-[19px] font-bold mb-8"
        disabled={isDisabled}
        isLoading={pending}
      >
        {isCreated ? 'Create' : 'Edit'} Project
      </Button>
      <span className={cn('mt-3', responseMessage ? 'mb-2' : 'mb-8')}>
        {responseMessage && (
          <Text
            customClass="text-xs px-0 whitespace-pre"
            value={responseMessage}
            variant="error"
          />
        )}
      </span>
    </div>
  );
};

export const ProjectForm = ({
  memberOptions,
  state,
  projectValue,
  participations,
  onSubmit,
}: ProjectFormProps) => {
  const { title, description, image, isPublic } = projectValue || {};

  const projectFormInitValues: ProjectFormType = useMemo(
    () => ({
      title: title || '',
      description: description || '',
      image: image || '',
      isPublic: isPublic !== undefined ? isPublic : true,
      members: participations || [],
    }),
    [title, description, image, isPublic, participations],
  );

  const {
    control,
    setError,
    getValues,
    reset,
    formState: { dirtyFields, errors },
  } = useForm<ProjectFormType>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: projectFormInitValues,
    resolver: zodResolver(ProjectFormDataSchema),
  });

  const dirtyItems = Object.keys(dirtyFields);
  // If create -> required fields
  // If edit -> Data is already filled ->  no empty fields
  const updateRequiredFields = useMemo(
    () => (isEmpty(projectValue) ? DEFAULT_REQUIRED_FIELDS : []),
    [projectValue],
  );
  const isDisabled = useMemo(
    () => !isEnableSubmitButton(updateRequiredFields, dirtyItems, errors),
    [dirtyItems, errors, updateRequiredFields],
  );

  const handleSubmit = () => {
    const formValues = getValues();
    onSubmit(formValues);
  };

  useEffect(() => {
    state.formErrors && setServerActionErrors(state.formErrors, setError);
  }, [state.formErrors, setError]);

  useEffect(() => {
    !isEmpty(projectValue) && reset(projectFormInitValues);
  }, [projectFormInitValues, projectValue, reset]);

  return (
    <form className="dark:text-white" action={handleSubmit}>
      <ProjectFormContent
        memberOptions={memberOptions}
        control={control}
        isDisabled={isDisabled}
        responseMessage={state?.error}
        isCreated={isEmpty(projectValue)}
      />
    </form>
  );
};
