import type { Meta, StoryObj } from '@storybook/react';

// Components
import { AvatarGroup } from '.';

// Constants
import { MOCK_PARTICIPATIONS } from '@/constants';

const meta = {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    maxDisplayed: { control: 'number' },
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    listUsers: MOCK_PARTICIPATIONS,
  },
};

export const ShortenList: Story = {
  args: {
    listUsers: MOCK_PARTICIPATIONS,
    maxDisplayed: 3,
  },
};
