// Components
import { Button } from '@/components';

// Icons
import { BiSolidErrorCircle } from 'react-icons/bi';

interface IProps {
  onClick: () => void;
  title?: string;
  description?: string;
  labelButton?: string;
}

export const ErrorContent = ({
  onClick,
  title = 'Something went wrong',
  description = 'The page you were trying to reach is currently unavailable.',
  labelButton = 'Try again',
}: IProps) => (
  <div className="container mx-auto flex flex-col items-center justify-center mt-[177px] sm:mt-14 lg:mt-52 mb-7.5">
    <BiSolidErrorCircle className="w-40 h-40 text-red-500 md:h-80 md:w-80" />
    <div className="flex flex-col items-center gap-3 md:gap-5">
      <h1 className="text-center font-bold text-2xl md:text-3xl">{title}</h1>
      <h2 className="text-center text-md md:text-xl">{description}</h2>
      <Button customClass="w-[88px] mt-6 md:mt-2" onClick={onClick}>
        {labelButton}
      </Button>
    </div>
  </div>
);
