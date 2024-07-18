'use client';

import { useEffect, useMemo } from 'react';
import { useFormStatus } from 'react-dom';
import { Control, Controller, UseFormSetValue, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';

// Components
import { Button, Dropdown, Input, Text } from '@/components';

// Constants
import {
  DATE_FORMAT,
  QUERY_PARAMS,
  TASK_PRIORITY_OPTIONS,
  TASK_STATUS_OPTIONS,
  TaskFormDataSchema,
} from '@/constants';

// Models
import {
  Task,
  Project,
  TaskFormState,
  TaskFormType,
  Participation,
} from '@/models';

// Utils
import {
  cn,
  isEmpty,
  isEnableSubmitButton,
  formatDate,
  setServerActionErrors,
  generateSlug,
} from '@/utils';
import { useSearchParams } from 'next/navigation';

const DEFAULT_REQUIRED_FIELDS = [
  'title',
  'description',
  'priority',
  'assignedTo',
];

const STATUS_FIELD = 'status';
const PROJECT_ID_FIELD = 'projectId';

type TaskFormProps = {
  assginedToOptions: Participation[];
  fromProject: Project;
  taskValue?: Task;
  state: TaskFormState;
  isReadOnly?: boolean;
  onSubmit: (formValues: TaskFormType) => void;
};

type TaskFormContentType = {
  assginedToOptions: Participation[];
  fromProject: Project;
  control: Control<TaskFormType>;
  setValue: UseFormSetValue<TaskFormType>;
  responseMessage?: string;
  isDisabled: boolean;
  isCreated?: boolean;
  isReadOnly?: boolean;
};

const TaskFormContent = ({
  assginedToOptions,
  fromProject,
  control,
  setValue,
  responseMessage,
  isDisabled,
  isCreated,
  isReadOnly,
}: TaskFormContentType) => {
  const { pending } = useFormStatus();

  return (
    <div>
      <div className="flex flex-col gap-2 mb-8">
        <label className="font-bold text-md ">Project</label>
        <Input
          readOnly={true}
          value={fromProject.title}
          disabled
          customClass="py-5"
        />
        <div />
      </div>

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
              readOnly={isReadOnly}
              placeholder="Title"
              value={value}
              onChange={(value) => {
                onChange(value);
                setValue('slug', generateSlug(value.target.value));
              }}
              disabled={pending}
              customClass="py-5"
              {...rest}
            />
            <span
              className={cn('bg-transparent', error?.message ? 'mb-2' : 'mb-8')}
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
        name="slug"
        control={control}
        render={({
          field: { onChange, value, ...rest },
          fieldState: { error },
        }) => (
          <div className="flex flex-col gap-2">
            <label className="font-bold text-md">Slug</label>
            <Input
              readOnly={isReadOnly}
              placeholder="Slug"
              value={value}
              onChange={(value) => {
                onChange(value);
              }}
              disabled={pending}
              customClass="py-5"
              {...rest}
            />
            <span
              className={cn('bg-transparent', error?.message ? 'mb-2' : 'mb-8')}
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
        name="description"
        control={control}
        render={({
          field: { onChange, value, ...rest },
          fieldState: { error },
        }) => (
          <div className="flex flex-col gap-2">
            <label className="font-bold text-md">Description</label>
            <Input
              readOnly={isReadOnly}
              placeholder="Description"
              value={value}
              onChange={(value) => {
                onChange(value);
              }}
              disabled={pending}
              customClass="py-5"
              {...rest}
            />
            <span
              className={cn('bg-transparent', error?.message ? 'mb-2' : 'mb-8')}
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
        name="image"
        control={control}
        render={({
          field: { onChange, value, ...rest },
          fieldState: { error },
        }) => (
          <div className="flex flex-col gap-2">
            <label className="font-bold text-md">Image</label>
            <Input
              readOnly={isReadOnly}
              placeholder="Image"
              value={value}
              onChange={(value) => {
                onChange(value);
              }}
              disabled={pending}
              customClass="py-5"
              {...rest}
            />
            <span
              className={cn('bg-transparent', error?.message ? 'mb-2' : 'mb-8')}
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
      <div className="flex flex-col sm:flex-row sm:gap-4">
        <Controller
          name="status"
          control={control}
          render={({
            field: { onChange, value, onBlur },
            fieldState: { error },
          }) => (
            <div className="flex flex-col gap-2 basis-1/2">
              <label className="font-bold text-md">Status</label>
              <Dropdown
                disabled={pending || isReadOnly}
                placeholder="Status"
                options={TASK_STATUS_OPTIONS}
                selectedItemValue={value}
                onSelect={(value) => {
                  onChange(value);
                }}
                onBlur={onBlur}
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
          name="priority"
          control={control}
          render={({
            field: { onChange, value, onBlur },
            fieldState: { error },
          }) => (
            <div className="flex flex-col gap-2 basis-1/2 z-10">
              <label className="font-bold text-md">Priority</label>
              <Dropdown
                disabled={pending || isReadOnly}
                placeholder="Priority"
                options={TASK_PRIORITY_OPTIONS}
                selectedItemValue={value}
                onSelect={(value) => {
                  onChange(value);
                }}
                onBlur={onBlur}
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
      </div>

      <Controller
        name="assignedTo"
        control={control}
        render={({
          field: { onChange, value, onBlur },
          fieldState: { error },
        }) => (
          <div className="flex flex-col gap-2">
            <label className="font-bold text-md">Assigned To</label>
            <Dropdown
              disabled={pending || isReadOnly}
              placeholder="Assigned To User"
              options={assginedToOptions.map((user) => ({
                name: user.name,
                value: user.userId,
              }))}
              selectedItemValue={value}
              onSelect={(value) => {
                onChange(value);
              }}
              onBlur={onBlur}
            />
            <span
              className={cn('bg-transparent', error?.message ? 'mb-2' : 'mb-8')}
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
        name="dueDate"
        control={control}
        render={({
          field: { onChange, value, ...rest },
          fieldState: { error },
        }) => (
          <div className="flex flex-col gap-2">
            <label className="font-bold text-md">Due Date</label>
            <Input
              readOnly={isReadOnly || pending}
              placeholder="Due Date"
              type="date"
              value={formatDate(value, DATE_FORMAT.Tertiary)}
              onChange={(e) => {
                const date = dayjs(new Date(e.target.value));
                onChange(date);
              }}
              customClass="py-5"
              {...rest}
            />
            <span
              className={cn('bg-transparent', error?.message ? 'mb-2' : 'mb-8')}
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
      {!isReadOnly && (
        <Button
          type="submit"
          customClass="w-full justify-center py-[19px] font-bold mb-8"
          disabled={isDisabled}
          isLoading={pending}
        >
          {isCreated ? 'Create' : 'Edit'} Task
        </Button>
      )}

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

export const TaskForm = ({
  assginedToOptions,
  fromProject,
  taskValue,
  state,
  isReadOnly,
  onSubmit,
}: TaskFormProps) => {
  const searchParams = useSearchParams();
  const searchParamProjectId = searchParams.get(QUERY_PARAMS.PROJECT_ID) || '';
  const searchParamStatus = searchParams.get(QUERY_PARAMS.STATUS) || '';

  const {
    title,
    slug,
    description,
    image,
    status,
    priority,
    assignedTo,
    projectId,
    dueDate,
  } = taskValue || {};

  const taskFormInitValues: TaskFormType = useMemo(
    () => ({
      title: title || '',
      slug: slug || '',
      description: description || '',
      image: image || '',
      status: status || searchParamStatus,
      priority: priority || '',
      assignedTo: assignedTo || '',
      projectId: projectId || searchParamProjectId,
      dueDate: (dueDate && new Date(dueDate)) || new Date(),
    }),
    [
      title,
      slug,
      description,
      image,
      dueDate,
      status,
      priority,
      assignedTo,
      projectId,
      searchParamProjectId,
      searchParamStatus,
    ],
  );

  const {
    control,
    setError,
    getValues,
    reset,
    setValue,
    formState: { dirtyFields, errors },
  } = useForm<TaskFormType>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: taskFormInitValues,
    resolver: zodResolver(TaskFormDataSchema),
  });

  const dirtyItems = Object.keys(dirtyFields);
  // If create -> default fields with search params value
  // If edit -> Data is already filled ->  no empty fields
  const updateRequiredFields = useMemo(() => {
    if (isEmpty(taskValue)) {
      const required = [...DEFAULT_REQUIRED_FIELDS];
      // If search param is empty => add to required
      // Else data is already filled
      isEmpty(searchParamProjectId) && required.push(PROJECT_ID_FIELD);
      isEmpty(searchParamStatus) && required.push(STATUS_FIELD);
      return required;
    } else {
      return [];
    }
  }, [taskValue, searchParamProjectId, searchParamStatus]);
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
    !isEmpty(taskValue) && reset(taskFormInitValues);
  }, [taskFormInitValues, taskValue, reset]);

  return (
    <form className="dark:text-white" action={handleSubmit}>
      <TaskFormContent
        assginedToOptions={assginedToOptions}
        fromProject={fromProject}
        control={control}
        setValue={setValue}
        responseMessage={state?.error}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isCreated={isEmpty(taskValue)}
      />
    </form>
  );
};
