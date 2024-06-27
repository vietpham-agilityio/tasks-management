// Constants
import { TaskFormDataSchema } from '@/constants';

// Models
import { TaskFormState, TaskFormType } from '@/models';

export async function createTask(
  prevState: TaskFormState,
  values: TaskFormType,
) {
  const validators = TaskFormDataSchema.safeParse(values);

  let result: TaskFormState = {};

  if (validators.success) {
    result = { success: true };
  }

  if (validators.error) {
    result = { success: false, errors: validators.error.flatten().fieldErrors };
  }

  return result;
}
