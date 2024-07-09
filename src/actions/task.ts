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
import { addDocument } from '@/db';

// Models
import { Task, TaskFormState, TaskFormType } from '@/models';

// HOCs
import { withAuth } from '@/hocs';

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
          const time = new Date().toISOString();

          const data: Omit<Task, 'id'> = {
            slug: values.slug,
            title: values.title,
            description: values.description,
            assignedTo: values.assignedTo,
            createdAt: time,
            createdBy: session.user.id,
            dueDate: values.dueDate,
            image: values.image,
            isArchived: false,
            priority: values.priority as TASK_PRIORITY_VALUE,
            status: values.status as TASK_STATUS_VALUE,
            updatedAt: time,
            projectId: values.projectId,
          };

          const taskResponse = await addDocument<Omit<Task, 'id'>>(
            COLLECTION.TASKS,
            data,
          );

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
        revalidateTag(TAGS.TASK_LIST);
        redirect(ROUTES.ADMIN_TASK_LIST);
      }

      return result;
    },
    { prevState, values },
  );
};
