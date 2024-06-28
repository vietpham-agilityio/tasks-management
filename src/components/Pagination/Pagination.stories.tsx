import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import { Pagination } from './index';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    onChangePageNumber: fn(),
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'outline',
    total: 50,
    currentPage: 1,
    pageSize: 3,
    siblingCount: 2,
  },
};

export const ShowBothLeftAndRightDots: Story = {
  args: {
    variant: 'outline',
    total: 50,
    currentPage: 9,
    pageSize: 3,
    siblingCount: 2,
  },
};

export const ShowLeftDots: Story = {
  args: {
    variant: 'outline',
    total: 50,
    currentPage: 15,
    pageSize: 3,
    siblingCount: 2,
  },
};
