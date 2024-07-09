'use server';

import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

// Constants
import {
  COLLECTION,
  ERROR_MESSAGES,
  ROUTES,
  TAGS,
  TASK_PRIORITY_VALUE,
  TASK_STATUS_VALUE,
  TaskFormDataSchema,
} from '@/constants';

// DB
import { addDocument, updateDocument } from '@/db';

// Models
import { Task, TaskFormState, TaskFormType } from '@/models';

// Types
import { Session } from 'next-auth';

// HOCs
import { withAuth } from '@/hocs';

const taskPayload = (values: TaskFormType, session: Session) => {
  const time = new Date().toISOString();
  const dueDateIntoISO = new Date(values.dueDate).toISOString();

  return {
    slug: values.slug,
    title: values.title,
    description: values.description,
    assignedTo: values.assignedTo,
    createdAt: time,
    createdBy: session.user.id,
    dueDate: dueDateIntoISO,
    image: values.image,
    isArchived: false,
    priority: values.priority as TASK_PRIORITY_VALUE,
    status: values.status as TASK_STATUS_VALUE,
    updatedAt: time,
    projectId: values.projectId,
  };
};

export const createTask = async (
  prevState: TaskFormState,
  values: TaskFormType,
) => {
  return await withAuth<
    {
      prevState: TaskFormState;
      values: TaskFormType;
    },
    TaskFormState
  >(
    async (args, session) => {
      const { values } = args;

      const validators = TaskFormDataSchema.safeParse(values);

      let result: TaskFormState = {};

      if (validators.success && session?.user.id) {
        result = { success: true };

        try {
          const data: Omit<Task, 'id'> = taskPayload(values, session);

          const taskResponse = await addDocument<Omit<Task, 'id'>>(
            COLLECTION.TASKS,
            data,
          );

          if (!taskResponse?.success) {
            throw new Error(ERROR_MESSAGES.UPSERTING_DATA_ERROR('Task'));
          }

          if (taskResponse.success) {
            result = {
              ...result,
              data: taskResponse.data,
            };
          }
        } catch (error) {
          result = {
            success: false,
            error: (error as Error).message,
          };
        }
      }

      if (validators.error) {
        result = {
          success: false,
          errors: validators.error.flatten().fieldErrors,
        };
      }

      if (result.success && result?.data) {
        revalidateTag(TAGS.TASK_LIST);
        redirect(ROUTES.ADMIN_TASK_DETAIL(result?.data.id));
      }

      return result;
    },
    { prevState, values },
  );
};

export const editTask = async (
  taskId: string,
  prevState: TaskFormState,
  values: TaskFormType,
) => {
  return await withAuth<
    {
      prevState: TaskFormState;
      values: TaskFormType;
    },
    TaskFormState
  >(
    async (args, session) => {
      const { values } = args;

      const validators = TaskFormDataSchema.safeParse(values);

      let result: TaskFormState = {};

      if (validators.success && session?.user.id) {
        result = { success: true };

        try {
          const payload: Task = { ...taskPayload(values, session), id: taskId };

          const taskResponse = await updateDocument(COLLECTION.TASKS, payload);

          if (!taskResponse?.success) {
            throw new Error(ERROR_MESSAGES.UPSERTING_DATA_ERROR('Task'));
          }
        } catch (error) {
          result = {
            success: false,
            error: (error as Error).message,
          };
        }
      }

      if (validators.error) {
        result = {
          success: false,
          errors: validators.error.flatten().fieldErrors,
        };
      }

      if (result.success) {
        revalidateTag(TAGS.TASK_DETAIL(taskId));
        revalidateTag(TAGS.TASK_LIST);
      }

      return result;
    },
    { prevState, values },
  );
};
