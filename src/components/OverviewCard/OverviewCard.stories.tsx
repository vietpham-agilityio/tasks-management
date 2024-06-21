import type { Meta, StoryObj } from '@storybook/react';

// Constants
import { DATE_FORMAT, MOCK_OVERVIEW_CARD_DATA } from '@/constants';

// Components
import { OverviewCard } from './index';
import { Badge } from '../Badge';

// Icons
import { ClockIcon } from '@/icons';

// Utils
import { formatDate } from '@/utils';

const meta = {
  title: 'Components/OverviewCard',
  component: OverviewCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof OverviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '/',
    title: MOCK_OVERVIEW_CARD_DATA.title,
    description: MOCK_OVERVIEW_CARD_DATA.description,
    imageSrc: MOCK_OVERVIEW_CARD_DATA.image,
    avatarSrc: MOCK_OVERVIEW_CARD_DATA.image,
    time: formatDate(MOCK_OVERVIEW_CARD_DATA.createdAt, DATE_FORMAT.Hour),
    isRowDisplay: false,
    badge: (
      <Badge
        label="Design Project"
        icon={<ClockIcon />}
        customClass="rounded-md text-white text-sm"
      />
    ),
    customClass: { wrapper: 'max-w-[450px]' },
  },
};

export const WithoutImageDefault: Story = {
  args: {
    href: '/',
    title: MOCK_OVERVIEW_CARD_DATA.title,
    description: MOCK_OVERVIEW_CARD_DATA.description,
    avatarSrc: MOCK_OVERVIEW_CARD_DATA.image,
    time: formatDate(MOCK_OVERVIEW_CARD_DATA.createdAt, DATE_FORMAT.Hour),
    badge: (
      <Badge
        label="Design Project"
        icon={<ClockIcon />}
        customClass="rounded-md text-white text-sm"
      />
    ),
    customClass: { wrapper: 'max-w-[450px]' },
  },
};

export const IsRowDisplay: Story = {
  args: {
    href: '/',
    title: MOCK_OVERVIEW_CARD_DATA.title,
    description: MOCK_OVERVIEW_CARD_DATA.description,
    imageSrc: MOCK_OVERVIEW_CARD_DATA.image,
    avatarSrc: MOCK_OVERVIEW_CARD_DATA.image,
    time: formatDate(MOCK_OVERVIEW_CARD_DATA.createdAt, DATE_FORMAT.Hour),
    isRowDisplay: true,
    badge: (
      <Badge
        label="Design Project"
        icon={<ClockIcon />}
        customClass="rounded-md text-white text-sm"
      />
    ),
    customClass: { wrapper: 'max-w-[450px]' },
  },
};

export const IsRowDisplayWithoutImage: Story = {
  args: {
    href: '/',
    title: MOCK_OVERVIEW_CARD_DATA.title,
    description: MOCK_OVERVIEW_CARD_DATA.description,
    time: formatDate(MOCK_OVERVIEW_CARD_DATA.createdAt, DATE_FORMAT.Hour),
    isRowDisplay: true,
    badge: (
      <Badge
        label="Design Project"
        icon={<ClockIcon />}
        customClass="rounded-md text-white text-sm"
      />
    ),
    customClass: { wrapper: 'max-w-[450px]' },
  },
};
