'use server';
import { revalidateTag } from 'next/cache';

// Constants
import { ParticipationFormDataSchema, TAGS } from '@/constants';

// DBs
import {
  assignUsersToProject,
  queryParticipationsByProjectId,
  removeUsersFromProject,
} from '@/db';

// Models
import {
  ParticipationFormState,
  ParticipationFormTypeWithMembers,
} from '@/models';

// HOCs
import { withAuth } from '@/hocs';

export const editParticipants = async (
  projectId: string,
  newData: ParticipationFormTypeWithMembers,
) => {
  let response: ParticipationFormState = {};
  try {
    response = await withAuth<
      {
        projectId: string;
        newData: ParticipationFormTypeWithMembers;
      },
      ParticipationFormState
    >(
      async (args, session) => {
        const validators = ParticipationFormDataSchema.safeParse(args.newData);
        let result: ParticipationFormState = {};
        if (validators.success && session?.user.id) {
          result = { success: true };
          // Get array of old participations from db
          const previousPartipcipantsResponse =
            await queryParticipationsByProjectId(args.projectId);
          if (previousPartipcipantsResponse.error) {
            throw new Error(previousPartipcipantsResponse.error);
          }
          // Get the removed participations
          const removedParticipant = previousPartipcipantsResponse.data
            .map((usr) => usr.userId)
            .filter((user) => !args.newData.memberIds.includes(user));
          // Unassign members from project
          const removedParticipantRepsonse = await removeUsersFromProject(
            removedParticipant,
            projectId,
          );
          if (removedParticipantRepsonse.error) {
            throw new Error(removedParticipantRepsonse.error);
          }
          // Include current user into the list of participants
          const assignedParticipantResponse = await assignUsersToProject(
            [...args.newData.members, { ...session.user }],
            projectId,
          );
          if (assignedParticipantResponse.error) {
            throw new Error(assignedParticipantResponse.error);
          }
        }
        if (validators.error) {
          return {
            success: false,
            formErrors: validators.error.flatten().fieldErrors,
          };
        }

        return result;
      },
      { projectId, newData },
    );
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
  if (response.success) {
    revalidateTag(TAGS.PROJECT_DETAIL(projectId));
  }
  return response;
};
