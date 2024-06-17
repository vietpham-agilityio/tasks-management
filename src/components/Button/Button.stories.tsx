import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Icons
import { FaRegUser } from 'react-icons/fa';

// Components
import { Button } from './';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    variant: {
      control: 'inline-radio',
      options: ['primary', 'outline'],
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
  },
};

export const IconButton: Story = {
  args: {
    children: <FaRegUser />,
    variant: 'outline',
  },
};

export const ButtonWithIcon: Story = {
  args: {
    children: 'Click me',
    startIcon: <FaRegUser />,
    customIconClass: 'pr-2',
    variant: 'outline',
  },
};
