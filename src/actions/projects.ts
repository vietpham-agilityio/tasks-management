'use server';
import { redirect } from 'next/navigation';

// Auth
import { auth } from '@/auth';

// Constants
import { ERROR_MESSAGES, ProjectFormDataSchema, ROUTES } from '@/constants';

// DB
import { deleteProject, assignUsersToProject, createProject } from '@/db';

// Models
import { Project, ProjectFormState, ProjectFormType } from '@/models';

// Utils
import { isEmpty } from '@/utils';

export async function createProjectWithParticipants(
  prevState: ProjectFormState,
  values: ProjectFormType,
): Promise<ProjectFormState> {
  // TODO: Create HOC to check auth for server actions
  const session = await auth();

  if (isEmpty(session)) {
    return {
      success: false,
      response: { error: ERROR_MESSAGES.UNAUTHORIZED_ACCESS },
    };
  }
  const validators = ProjectFormDataSchema.safeParse(values);
  let result: ProjectFormState = {};
  if (validators.success && session?.user.id) {
    result = { success: true };

    try {
      const time = new Date().toISOString();
      const slugId = crypto.getRandomValues(new Uint32Array(1))[0];
      const data: Omit<Project, 'id'> = {
        slug: `${values.title.replace(/\s+/g, '-').toLowerCase()}-${slugId}`,
        title: values.title,
        description: values.description,
        image: values.image,
        createdAt: time,
        updatedAt: time,
        isArchived: false,
        isPublic: values.isPublic,
        createdBy: session.user.id,
      };
      const projectResponse = await createProject(data);
      if (!projectResponse.success) {
        throw new Error(projectResponse.error);
      }
      if (projectResponse.success && projectResponse.data) {
        // Include current user into the list of participants
        const participantResponse = await assignUsersToProject(
          [...values.members, session.user.id],
          projectResponse.data.id,
          deleteProject,
          true,
        );
        if (!participantResponse.success) {
          throw new Error(participantResponse.error);
        }
      }
    } catch (error) {
      result = {
        success: false,
        response: {
          error: (error as Error).message,
        },
      };
    }
  }

  if (validators.error) {
    result = { success: false, errors: validators.error.flatten().fieldErrors };
  }
  if (result.success) {
    // TODO: Revalidate Tags
    redirect(ROUTES.ADMIN_PROJECT_LIST);
  }
  return result;
}

export async function updateProjectWithParticipants(
  id: string,
  prevState: ProjectFormState,
  values: ProjectFormType,
) {
  const validators = ProjectFormDataSchema.safeParse(values);
  let result: ProjectFormState = {};
  if (validators.success) {
    result = { success: true, response: { error: id } };
    return result;
  }
  if (validators.error) {
    result = { success: false, errors: validators.error.flatten().fieldErrors };
    return result;
  }
  return result;
}
