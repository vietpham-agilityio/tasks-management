import { render, screen } from '@testing-library/react';

// Components
import { OverviewCard } from './index';
import { Badge } from '../Badge';

// Constants
import { DATE_FORMAT, MOCK_OVERVIEW_CARD_DATA } from '@/constants';

// Icons
import { ClockIcon } from '@/icons';

// Utils
import { formatDate } from '@/utils';

describe('OverviewCard component', () => {
  test('renders the OverviewCard match snapshot', () => {
    const { container } = render(
      <OverviewCard
        href="/"
        title={MOCK_OVERVIEW_CARD_DATA.title}
        description={MOCK_OVERVIEW_CARD_DATA.description}
        time={formatDate(MOCK_OVERVIEW_CARD_DATA.createdAt, DATE_FORMAT.Hour)}
        isRowDisplay={true}
        badge={
          <Badge
            label="Design Project"
            icon={<ClockIcon />}
            customClass="rounded-md text-white text-sm"
          />
        }
      />,
    );
    expect(container).toMatchSnapshot();
  });

  test('renders the OverviewCard with children', () => {
    render(
      <OverviewCard
        href="/"
        title={MOCK_OVERVIEW_CARD_DATA.title}
        description={MOCK_OVERVIEW_CARD_DATA.description}
        time={formatDate(MOCK_OVERVIEW_CARD_DATA.createdAt, DATE_FORMAT.Hour)}
        isRowDisplay={true}
        badge={
          <Badge
            label="Design Project"
            icon={<ClockIcon />}
            customClass="rounded-md text-white text-sm"
          />
        }
      />,
    );
    expect(screen.getByText('Design Project')).toBeInTheDocument();
    expect(
      screen.getByText(
        formatDate(MOCK_OVERVIEW_CARD_DATA.createdAt, DATE_FORMAT.Hour),
      ),
    ).toBeInTheDocument();
  });
});
