import { render, screen } from '@testing-library/react';

// Components
import { StatisticCard } from './index';

// Icons
import { HomeIcon } from '@/icons';

describe('StatisticCard component', () => {
  test('renders the StatisticCard with children', () => {
    render(
      <StatisticCard
        to="/"
        variant="warning"
        icon={<HomeIcon customClass="w-5 h-5" />}
        label="Priority Task"
        description="23/34 Task"
      />,
    );
    expect(screen.getByText('Priority Task')).toBeInTheDocument();
    expect(screen.getByText('23/34 Task')).toBeInTheDocument();
  });

  test('renders icon', () => {
    render(
      <StatisticCard
        to="/"
        variant="warning"
        icon={<div>Icon</div>}
        label="Priority Task"
        description="23/34 Task"
      />,
    );
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  test('applies the correct theme classes', () => {
    render(
      <StatisticCard
        to="/"
        variant="warning"
        icon={<div>Icon</div>}
        label="Priority Task"
        description="23/34 Task"
      />,
    );
    expect(screen.getByTestId('statisticCard')).toHaveClass(
      'flex flex-col rounded-lg pl-[12.5px] pr-[21.5px] py-[11px] bg-yellow-100',
    );
  });
});
