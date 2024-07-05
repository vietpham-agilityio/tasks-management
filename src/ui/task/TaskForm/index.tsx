'use client';
import { useEffect, useMemo } from 'react';
import { useFormStatus } from 'react-dom';
import { Control, Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';

// Components
import { Button, Dropdown, Input, Text } from '@/components';

// Constants
import {
  DATE_FORMAT,
  TASK_PRIORITY_OPTIONS,
  TASK_STATUS_OPTIONS,
  TaskFormDataSchema,
} from '@/constants';

// Models
import { User } from '@/types';
import { Task, TaskFormState, TaskFormType } from '@/models';

// Utils
import {
  cn,
  isEmpty,
  isEnableSubmitButton,
  formatDate,
  setServerActionErrors,
} from '@/utils';

const DEFAULT_REQUIRED_FIELDS = [
  'title',
  'description',
  'status',
  'priority',
  'assignedTo',
];

type TaskFormProps = {
  assginedToOptions: User[];
  taskValue?: Task;
  state: TaskFormState;
  onSubmit: (formValues: TaskFormType) => void;
};

type TaskFormContentType = {
  assginedToOptions: User[];
  control: Control<{
    title: string;
    description: string;
    image?: string;
    status: string;
    priority: string;
    assignedTo: string;
    dueDate: Date;
  }>;
  responseMessage?: string;
  isDisabled: boolean;
  isCreated?: boolean;
};

const TaskFormContent = ({
  assginedToOptions,
  control,
  responseMessage,
  isDisabled,
  isCreated,
}: TaskFormContentType) => {
  const { pending } = useFormStatus();

  return (
    <div className="">
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
      <div className="flex flex-row gap-4">
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
                placeholder="Select Status"
                options={TASK_STATUS_OPTIONS}
                selectedItemValue={value}
                onSelect={(value) => {
                  onChange(value);
                }}
                onBlur={onBlur}
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
          name="priority"
          control={control}
          render={({
            field: { onChange, value, onBlur },
            fieldState: { error },
          }) => (
            <div className="flex flex-col gap-2 basis-1/2 z-10">
              <label className="font-bold text-md">Priority</label>
              <Dropdown
                placeholder="Select Priority"
                options={TASK_PRIORITY_OPTIONS}
                selectedItemValue={value}
                onSelect={(value) => {
                  onChange(value);
                }}
                onBlur={onBlur}
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
              placeholder="Assigned To User"
              options={assginedToOptions.map((user) => ({
                name: user.name,
                value: user.id,
              }))}
              selectedItemValue={value}
              onSelect={(value) => {
                onChange(value);
              }}
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
        name="dueDate"
        control={control}
        render={({
          field: { onChange, value, ...rest },
          fieldState: { error },
        }) => (
          <div className="flex flex-col gap-2">
            <label className="font-bold text-md">Due Date</label>
            <Input
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
        {isCreated ? 'Create' : 'Edit'} Task
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

export const TaskForm = ({
  assginedToOptions,
  taskValue,
  state,
  onSubmit,
}: TaskFormProps) => {
  const { title, description, image, status, priority, assignedTo, dueDate } =
    taskValue || {};

  const taskFormInitValues: TaskFormType = useMemo(
    () => ({
      title: title || '',
      description: description || '',
      image: image || '',
      status: status || '',
      priority: priority || '',
      assignedTo: assignedTo || '',
      dueDate: dueDate || new Date(),
    }),
    [title, description, image, dueDate, status, priority, assignedTo],
  );

  const {
    control,
    setError,
    getValues,
    reset,
    formState: { dirtyFields, errors },
  } = useForm<TaskFormType>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: taskFormInitValues,
    resolver: zodResolver(TaskFormDataSchema),
  });

  const dirtyItems = Object.keys(dirtyFields);
  // If create -> required fields
  // If edit -> Data is already filled ->  no empty fields
  const updateRequiredFields = useMemo(
    () => (isEmpty(taskValue) ? DEFAULT_REQUIRED_FIELDS : []),
    [taskValue],
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
    state.errors && setServerActionErrors(state.errors, setError);
  }, [state.errors, setError]);

  useEffect(() => {
    !isEmpty(taskValue) && reset(taskFormInitValues);
  }, [taskFormInitValues, taskValue, reset]);

  return (
    <form className="dark:text-white" action={handleSubmit}>
      <TaskFormContent
        assginedToOptions={assginedToOptions}
        control={control}
        responseMessage={state?.response?.error}
        isDisabled={isDisabled}
        isCreated={isEmpty(taskValue)}
      />
    </form>
  );
};
