import type { Meta, StoryObj } from '@storybook/react';

// Components
import { PublicNavBar } from './index';

// Constants
import { ROUTES } from '@/constants';

const meta = {
  title: 'Components/PublicNavBar',
  component: PublicNavBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PublicNavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
};

export const IsCurrentPath: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: ROUTES.BOARDS,
      },
    },
  },
};
