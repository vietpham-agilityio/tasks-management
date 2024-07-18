// Components
import { InputFieldSkeleton } from '../InputFieldSkeleton';

// Types
import { CustomClassType } from '@/types';

// Utils
import { cn } from '@/utils';

type InputSkeletonProps = {
  label: string;
} & CustomClassType;
export const InputSkeleton = ({ label, customClass }: InputSkeletonProps) => (
  <div className={cn('flex flex-col gap-2', customClass)}>
    <label className="font-bold text-md">{label}</label>
    <InputFieldSkeleton />
    <div />
  </div>
);
