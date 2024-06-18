import type { Meta, StoryObj } from '@storybook/react';

// Components
import NavLink from './index';
import { BoardIcon, HomeIcon } from '@/icons';

const meta = {
  title: 'Components/NavLink',
  component: NavLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isActive: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof NavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <HomeIcon customClass="w-5 h-5" />,
    label: 'Home',
    href: '/',
    className: 'w-[158px]',
  },
};

export const IsSelected: Story = {
  args: {
    icon: <BoardIcon customClass="w-5 h-5" />,
    label: 'Boards',
    href: '/',
    isActive: true,
    className: 'w-[158px]',
  },
};
