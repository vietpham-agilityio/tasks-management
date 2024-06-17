import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import { Input } from './';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    variant: {
      control: 'inline-radio',
      options: ['primary', 'outline', 'fill'],
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Input here',
    variant: 'primary',
  },
};

export const Outline: Story = {
  args: {
    placeholder: 'Input here',
    variant: 'outline',
  },
};

export const Fill: Story = {
  args: {
    variant: 'fill',
    placeholder: 'Input here',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Input here',
    variant: 'primary',
    disabled: true,
  },
};
