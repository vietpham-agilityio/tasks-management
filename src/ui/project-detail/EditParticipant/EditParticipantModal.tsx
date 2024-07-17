import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

// Actions
import { editParticipants } from '@/actions';

// Components
import { BaseModal, Button, MultipleSelect, Text } from '@/components';

// Constants
import { ParticipationFormDataSchema, SUCCESS_MESSAGES } from '@/constants';

// Models
import { ParticipationFormType } from '@/models';

// HOCs
import { TWithToast, withToast } from '@/hocs';

// Types
import { User } from '@/types';

// Utils
import {
  cn,
  isEmpty,
  isEnableSubmitButton,
  setServerActionErrors,
} from '@/utils';

type EditParticipantModalBaseProps = {
  projectId: string;
  memberOptions: User[];
  participations: string[];
  isOpen: boolean;
  setModalState: (value: boolean) => void;
};

const DEFAULT_REQUIRED_FIELDS = ['memberIds'];

const EditParticipantModalBase = ({
  projectId,
  memberOptions,
  participations,
  isOpen,
  setModalState,
  openToast,
}: TWithToast<EditParticipantModalBaseProps>) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);

  const participantsFormInitValues: ParticipationFormType = useMemo(
    () => ({
      memberIds: participations || [],
    }),
    [participations],
  );

  const {
    control,
    setError,
    handleSubmit: submitConfirm,
    reset,
    formState: { dirtyFields, errors },
  } = useForm<ParticipationFormType>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: participantsFormInitValues,
    resolver: zodResolver(ParticipationFormDataSchema),
  });

  const dirtyItems = Object.keys(dirtyFields);

  const isDisabled = useMemo(
    () => !isEnableSubmitButton(DEFAULT_REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors],
  );

  const handleSetModal = useCallback(
    (value: boolean) => {
      setModalState(value);
      reset(participantsFormInitValues);
    },
    [setModalState, reset, participantsFormInitValues],
  );

  const handleSubmit: SubmitHandler<ParticipationFormType> = useCallback(
    async (values) => {
      setLoading(true);
      const response = await editParticipants(projectId, {
        ...values,
        members: memberOptions.filter((member) =>
          values.memberIds.includes(member.id),
        ),
      });
      setLoading(false);
      if (response.formErrors) {
        setServerActionErrors(response.formErrors, setError);
        return;
      }
      if (response.success) {
        openToast({
          variant: 'success',
          message: SUCCESS_MESSAGES.EDIT_PARTICIPANTS,
        });
        setModalState(false);
        reset(participantsFormInitValues);
        router.refresh();
        return;
      }
      if (response.error) {
        openToast({ variant: 'error', message: response.error });
        setModalState(false);
        return;
      }
    },
    [
      openToast,
      participantsFormInitValues,
      projectId,
      memberOptions,
      reset,
      router,
      setError,
      setModalState,
    ],
  );

  useEffect(() => {
    !isEmpty(participations) && reset(participantsFormInitValues);
  }, [participantsFormInitValues, participations, reset]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleSetModal}
      title="Edit Member(s)"
      customClass={{
        modalWrappper: 'max-w-screen-sm top-40',
      }}
    >
      <Controller
        name="memberIds"
        control={control}
        render={({
          field: { onChange, value, onBlur },
          fieldState: { error },
        }) => (
          <div className="flex flex-col gap-2">
            <label className="font-bold text-md">Members</label>
            <MultipleSelect
              onChange={(value) => {
                onChange(value);
              }}
              options={memberOptions.map((member) => ({
                name: member.name,
                value: member.id,
              }))}
              selectedOptions={value}
              onBlur={onBlur}
              disabled={isLoading}
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
        isLoading={isLoading}
        type="submit"
        customClass="w-full justify-center py-[19px] font-bold mb-8"
        onClick={submitConfirm(handleSubmit)}
        disabled={isDisabled}
      >
        Edit
      </Button>
    </BaseModal>
  );
};

export const EditParticipantModal = withToast(EditParticipantModalBase);
