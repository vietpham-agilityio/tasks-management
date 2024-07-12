import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import { MultipleSelect } from '.';

import { PRIORITY_OPTIONS } from '@/ui/task/FilterWrapper';

const mockSelectedOptions = ['2'];

const meta = {
  title: 'Components/MultipleSelect',
  component: MultipleSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof MultipleSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: PRIORITY_OPTIONS,
    selectedOptions: mockSelectedOptions,
    onChange: fn(),
  },
  render: ({ options, selectedOptions, onChange }) => (
    <div className="w-96 px-4 py-8">
      <MultipleSelect
        options={options}
        selectedOptions={selectedOptions}
        onChange={onChange}
      />
    </div>
  ),
};
export const Disabled: Story = {
  args: {
    options: PRIORITY_OPTIONS,
    selectedOptions: mockSelectedOptions,
    onChange: fn(),
    disabled: true,
  },
  render: ({ options, selectedOptions, disabled, onChange }) => (
    <div className="w-96 px-4 py-8">
      <MultipleSelect
        options={options}
        selectedOptions={selectedOptions}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  ),
};

export const MultipleSelectWithLabel: Story = {
  args: {
    title: 'Priority',
    options: PRIORITY_OPTIONS,
    onChange: fn(),
  },
};
