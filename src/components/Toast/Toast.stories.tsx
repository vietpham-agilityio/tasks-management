import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Toast } from './index';
import { ClockIcon } from '@/icons';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'success',
        'error',
        'warning',
      ],
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <ClockIcon customClass="w-5 h-5" />,
    message: 'Toast message',
    variant: 'primary',
  },
  render: ({ icon, message, variant }) => (
    <div className="w-96 h-40">
      <Toast icon={icon} message={message} variant={variant} />
    </div>
  ),
};
