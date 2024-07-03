import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import { ErrorContent } from './index';

const meta = {
  title: 'Components/ErrorContent',
  component: ErrorContent,
  parameters: {
    layout: 'centerd',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof ErrorContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ErrorContentWithDefaultProps: Story = {
  args: {
    onClick: fn(),
  },
};

export const ErrorContentWithTitleProps: Story = {
  args: {
    ...ErrorContentWithDefaultProps.args,
    title: 'Have error occurred',
  },
};

export const ErrorContentWithDescriptionProps: Story = {
  args: {
    ...ErrorContentWithDefaultProps.args,
    description: 'Please try again',
  },
};

export const ErrorContentLabelButtonProps: Story = {
  args: {
    ...ErrorContentWithDefaultProps.args,
    labelButton: 'Try Again',
  },
};
