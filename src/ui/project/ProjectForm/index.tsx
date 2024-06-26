'use client';
import { useEffect, useMemo } from 'react';
import { useFormState } from 'react-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// APIs
import { createProject } from '@/actions';

// Components
import { Button, Checkbox, Input, MultipleSelect, Text } from '@/components';

// Constants
import { ProjectFormDataSchema } from '@/constants';

// Models
import { ProjectFormType } from '@/models';
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
  membersOptions: User[];
  data?: ProjectFormType;
};

export const ProjectForm = ({ membersOptions, data }: ProjectFormProps) => {
  const { title, description, image, isPublic, members } = data || {};

  const projectFormInitValues: ProjectFormType = useMemo(
    () => ({
      title: title || '',
      description: description || '',
      image: image || '',
      isPublic: isPublic || true,
      members: members || [],
    }),
    [title, description, image, isPublic, members],
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
    () => (isEmpty(data) ? DEFAULT_REQUIRED_FIELDS : []),
    [data],
  );
  const isDisabled = useMemo(
    () => !isEnableSubmitButton(updateRequiredFields, dirtyItems, errors),
    [dirtyItems, errors, updateRequiredFields],
  );

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createProject, initialState);

  const handleSubmit = () => {
    const formValues = getValues();
    dispatch(formValues);
  };

  useEffect(() => {
    state.errors && setServerActionErrors(state.errors, setError);
  }, [state.errors, setError]);

  useEffect(() => {
    !isEmpty(data) && reset(projectFormInitValues);
  }, [projectFormInitValues, data, reset]);

  return (
    <form className="dark:text-white" action={handleSubmit}>
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
              options={membersOptions.map((member) => ({
                name: member.name,
                value: member.id,
              }))}
              selectedOptions={value}
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
      >
        Create Project
      </Button>
    </form>
  );
};
