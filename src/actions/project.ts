// Constants
import { ProjectFormDataSchema } from '@/constants';

// Models
import { ProjectFormState, ProjectFormType } from '@/models';

export async function createProject(
  prevState: ProjectFormState,
  values: ProjectFormType,
) {
  const validators = ProjectFormDataSchema.safeParse(values);

  let result: ProjectFormState = {};

  if (validators.success) {
    result = { success: true };
  }

  if (validators.error) {
    result = { success: false, errors: validators.error.flatten().fieldErrors };
  }

  return result;
}
