import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import { Dropdown } from './';

const mockOptions = [
  {
    name: 'Option 1',
    value: '1',
  },
  {
    name: 'Option 2',
    value: '2',
  },
  {
    name: 'Option 3',
    value: '3',
  },
];

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centerd',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    onSelect: fn(),
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: mockOptions,
    title: 'Select item',
    onSelect: fn(),
  },
};
