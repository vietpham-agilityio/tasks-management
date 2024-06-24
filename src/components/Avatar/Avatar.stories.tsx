import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Avatar } from './';

const mockImageUrl =
  'https://i.seadn.io/gae/gctNTZKmTRG5z7A56d1GOfh4pxaM_b-XtVrmFN4FE6269fZoIOhc5dtr4YVHaOGRiXkRBVTta91iuz344f6YpjCTda7sfOWC5qlp?auto=format&dpr=1&w=3840';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['square', 'circle'],
    },
    width: {
      control: 'number',
    },
    height: {
      control: 'number',
    },
    src: {
      control: 'text',
    },
    name: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 64,
    height: 64,
    src: mockImageUrl,
    name: 'test user',
  },
};

export const CircleImage: Story = {
  args: {
    width: 64,
    height: 64,
    src: mockImageUrl,
    name: 'test user',
    variant: 'circle',
  },
};
