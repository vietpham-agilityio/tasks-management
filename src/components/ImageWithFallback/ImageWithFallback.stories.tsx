import type { Meta, StoryObj } from '@storybook/react';

// Components
import ImageWithFallback from './index';

// Constants
import { MOCK_IMAGE_LINK } from '@/constants/mocks';

const meta = {
  title: 'Components/ImageWithFallback',
  component: ImageWithFallback,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ImageWithFallback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: MOCK_IMAGE_LINK,
    alt: 'Image 1',
    width: '0',
    height: '0',
    sizes: '100vw',
    style: { width: '100%', height: 'auto' },
    unoptimized: true,
  },
};

export const FallbackImageWhenError: Story = {
  args: {
    src: 'Fail To Load',
    alt: 'Fail To Load',
    width: '0',
    height: '0',
    sizes: '100vw',
    style: { width: '100%', height: 'auto' },
    unoptimized: true,
  },
};
