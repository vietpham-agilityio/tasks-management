import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import { Checkbox } from './index';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'option1',
    label: 'Option 1',
    description:
      'guidelines regarding color contrast ratios and provide options for users to adjust text size',
  },
};

export const IsDisabledCheckbox: Story = {
  args: {
    label: 'Option 2',
    description:
      'guidelines regarding color contrast ratios and provide options for users to adjust text size',
    disabled: true,
    checked: true,
  },
};
