import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Text } from './index';

// Icons
import { DotIcon } from '@/icons';

const meta = {
  title: 'Components/Text',
  component: Text,
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
        'quaternary',
        'warning',
        'error',
        'success',
      ],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <DotIcon />,
    value: 'Sample Text',
    variant: 'primary',
  },
};

export const TextOnly: Story = {
  args: {
    value: 'Sample Text',
    variant: 'primary',
  },
};

export const WithCustomColor: Story = {
  args: {
    value: 'Sample Text',
    variant: 'primary',
    customClass: 'fill-orange-500 text-orange-500',
  },
};
