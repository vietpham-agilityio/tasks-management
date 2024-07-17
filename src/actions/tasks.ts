'use server';

import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

// Constants
import {
  ERROR_MESSAGES,
  ROUTES,
  TAGS,
  TASK_PRIORITY_VALUE,
  TASK_STATUS_VALUE,
  TaskFormDataSchema,
} from '@/constants';

// DB
import { deleteTask, updateTask, createTask, getTaskDetailById } from '@/db';

// Models
import { ResponseStateType, Task, TaskFormState, TaskFormType } from '@/models';

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

export const addTaskToProject = async (
  prevState: TaskFormState,
  values: TaskFormType,
) => {
  let response: TaskFormState = {};
  try {
    response = await withAuth<
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
          const data: Omit<Task, 'id'> = taskPayload(values, session);
          return await createTask(data);
        }

        if (validators.error) {
          result = {
            success: false,
            data: null,
            formErrors: validators.error.flatten().fieldErrors,
          };
        }

        return result;
      },
      { prevState, values },
    );
  } catch (error) {
    return {
      success: false,
      data: null,
      error: (error as Error).message,
    };
  }
  if (response.success && response?.data) {
    revalidateTag(TAGS.TASK_LIST);
    revalidateTag(TAGS.PROJECT_DETAIL(response.data.projectId));
    redirect(ROUTES.ADMIN_PROJECT_DETAIL(response.data.projectId));
  }
  return response;
};

export const editTask = async (
  taskId: string,
  prevState: TaskFormState,
  values: TaskFormType,
) => {
  let response: TaskFormState = {};
  try {
    response = await withAuth<
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

          const payload: Task = { ...taskPayload(values, session), id: taskId };

          return await updateTask(taskId, payload);
        }

        if (validators.error) {
          result = {
            success: false,
            data: null,
            formErrors: validators.error.flatten().fieldErrors,
          };
        }

        return result;
      },
      { prevState, values },
    );
  } catch (error) {
    return {
      success: false,
      data: null,
      error: (error as Error).message,
    };
  }
  if (response.success && response.data) {
    revalidateTag(TAGS.TASK_LIST);
    revalidateTag(TAGS.TASK_DETAIL(taskId));
    redirect(ROUTES.ADMIN_PROJECT_DETAIL(response.data.projectId));
  }
  return response;
};

export const removeTask = async (taskId: string) => {
  try {
    return await withAuth<
      {
        taskId: string;
      },
      ResponseStateType<{ taskId: string } | null>
    >(
      async (args) => {
        const { taskId } = args;
        const task = await getTaskDetailById(taskId);

        if (task.data) {
          const result = await deleteTask(taskId);

          if (result.success) {
            revalidateTag(TAGS.TASK_LIST);
            revalidateTag(TAGS.TASK_DETAIL(taskId));
            revalidateTag(TAGS.TASK_DETAIL(task.data.slug));
          }
          return result;
        }
        throw new Error(ERROR_MESSAGES.REQUESTING_DATA);
      },
      { taskId },
    );
  } catch (error) {
    return {
      success: false,
      data: null,
      error: (error as Error).message,
    };
  }
};
