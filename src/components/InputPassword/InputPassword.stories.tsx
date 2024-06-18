import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import { InputPassword } from '.';

const meta = {
  title: 'Components/InputPassword',
  component: InputPassword,
  parameters: {
    layout: 'centerd',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof InputPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
    onChange: fn(),
  },
  render: ({ disabled, onChange, value }) => (
    <div className="px-4 py-8">
      <InputPassword onChange={onChange} disabled={disabled} value={value} />
    </div>
  ),
};
