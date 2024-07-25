import type { Meta, StoryObj } from '@storybook/react';

// Components
import { StatisticCard } from './index';

// Icons
import { HomeIcon } from '@/icons';

const meta = {
  title: 'Components/StatisticCard',
  component: StatisticCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'success',
        'error',
        'warning',
      ],
    },
  },
} satisfies Meta<typeof StatisticCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    to: '/',
    icon: <HomeIcon customClass="w-5 h-5" />,
    label: 'In Progress',
    variant: 'primary',
    description: '50/100 Tasks',
  },
};
