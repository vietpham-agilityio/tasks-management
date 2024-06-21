import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Badge } from './index';
import { ClockIcon } from '@/icons';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
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
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <ClockIcon />,
    label: 'Status',
    theme: 'primary',
    customClass: 'rounded-md text-xs fill-white text-white ',
  },
};
