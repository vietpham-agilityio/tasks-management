// Utils
import { cn } from '@/utils';

// Icons
import { CgSpinner } from 'react-icons/cg';

export default function Loading() {
  return (
    <div className="flex justify-center mt-96">
      <CgSpinner className={cn('animate-spin w-20 h-20')} />
    </div>
  );
}
