'use server';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

// Constants
import {
  ERROR_MESSAGES,
  ProjectFormDataSchema,
  ROUTES,
  TAGS,
  COLLECTION,
} from '@/constants';

// DBs
import {
  deleteProject,
  assignUsersToProject,
  createProject,
  updateProject,
  removeUsersFromProject,
  queryParticipationsByProjectId,
  updateDocument,
} from '@/db';

// Models
import {
  EditProjetDataType,
  Project,
  ProjectFormState,
  ProjectFormType,
  ResponseStateType,
} from '@/models';

// HOCs
import { withAuth } from '@/hocs';

export const createProjectWithParticipants = async (
  prevState: ProjectFormState,
  values: ProjectFormType,
) => {
  let response: ProjectFormState = {};
  try {
    response = await withAuth<
      {
        prevState: ProjectFormState;
        values: ProjectFormType;
      },
      ProjectFormState
    >(
      async (args, session) => {
        const { values } = args;

        const validators = ProjectFormDataSchema.safeParse(values);
        let result: ProjectFormState = {};
        if (validators.success && session?.user.id) {
          result = { success: true };

          const time = new Date().toISOString();
          const data: Omit<Project, 'id'> = {
            title: values.title,
            slug: values.slug,
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
            result = {
              ...result,
              data: projectResponse.data,
            };
            if (!participantResponse.success) {
              throw new Error(participantResponse.error);
            }
          }
        }

        if (validators.error) {
          return {
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
    revalidateTag(TAGS.PROJECT_LIST);
    redirect(ROUTES.ADMIN_PROJECT_DETAIL(response.data.id));
  }
  return response;
};

export const updateProjectWithParticipants = async (
  id: string,
  prevState: ProjectFormState,
  newData: ProjectFormType,
) => {
  let response: ProjectFormState = {};
  try {
    response = await withAuth<
      {
        id: string;
        prevState: ProjectFormState;
        newData: ProjectFormType;
      },
      ProjectFormState
    >(
      async (args, session) => {
        const validators = ProjectFormDataSchema.safeParse(args.newData);
        let result: ProjectFormState = {};
        if (validators.success && session?.user.id) {
          result = { success: true };
          const time = new Date().toISOString();
          const data: EditProjetDataType = {
            title: newData.title,
            slug: newData.slug,
            description: newData.description,
            image: newData.image,
            isPublic: newData.isPublic,
            updatedAt: time,
          };
          const projectResponse = await updateProject(id, data);
          if (!projectResponse.success) {
            throw new Error(projectResponse.error);
          }
          if (projectResponse.success && projectResponse.data) {
            // Get array of old participations from db
            const previousPartipcipantsResponse =
              await queryParticipationsByProjectId(id);
            if (!previousPartipcipantsResponse.data) {
              throw new Error(previousPartipcipantsResponse.error);
            }
            // Get the removed participations
            const removedParticipant = previousPartipcipantsResponse.data
              .map((usr) => usr.userId)
              .filter((user) => !newData.members.includes(user));
            // Unassign members from project
            const removedParticipantRepsonse = await removeUsersFromProject(
              removedParticipant,
              id,
            );
            if (removedParticipantRepsonse.error) {
              throw new Error(removedParticipantRepsonse.error);
            }
            // Include current user into the list of participants
            const assignedParticipantResponse = await assignUsersToProject(
              [...newData.members, session.user.id],
              id,
            );
            if (assignedParticipantResponse.error) {
              throw new Error(assignedParticipantResponse.error);
            }
          }
        }
        if (validators.error) {
          return {
            success: false,
            data: null,
            formErrors: validators.error.flatten().fieldErrors,
          };
        }

        return result;
      },
      { id, prevState, newData },
    );
  } catch (error) {
    return {
      success: false,
      data: null,
      error: (error as Error).message,
    };
  }
  if (response.success) {
    revalidateTag(TAGS.PROJECT_LIST);
    revalidateTag(TAGS.PROJECT_DETAIL(id));
    redirect(ROUTES.ADMIN_PROJECT_DETAIL(id));
  }
  return response;
};

export const removeProjectById = async (projectId: string) => {
  try {
    return await withAuth<
      {
        projectId: string;
      },
      ResponseStateType<{ projectId: string } | null>
    >(
      async (args) => {
        const result = await deleteProject(args.projectId);
        if (result.success) {
          revalidateTag(TAGS.PROJECT_LIST);
          revalidateTag(TAGS.PROJECT_DETAIL(args.projectId));
        }
        return result;
      },
      { projectId },
    );
  } catch (error) {
    return {
      success: false,
      data: null,
      error: (error as Error).message,
    };
  }
};

export const archiveProjectById = async (id: string, isArchived: boolean) => {
  try {
    return await withAuth<
      {
        id: string;
        isArchived: boolean;
      },
      ResponseStateType<null>
    >(
      async (args) => {
        const projectResult = await updateDocument(COLLECTION.PROJECTS, args);
        if (projectResult?.success) {
          revalidateTag(TAGS.PROJECT_LIST);
          revalidateTag(TAGS.PROJECT_DETAIL(args.id));
          return {
            success: true,
            data: null,
          };
        }

        return {
          success: false,
          data: null,
          error: ERROR_MESSAGES.UPSERTING_DATA_ERROR('Project'),
        };
      },
      { id, isArchived },
    );
  } catch (error) {
    return {
      success: false,
      data: null,
      error: (error as Error).message,
    };
  }
};
