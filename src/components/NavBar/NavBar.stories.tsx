import type { Meta, StoryObj } from '@storybook/react';

// Components
import { NavBar } from './index';

// Constants
import { ROUTES } from '@/constants';

const meta = {
  title: 'Components/NavBar',
  component: NavBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavBar>;

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
