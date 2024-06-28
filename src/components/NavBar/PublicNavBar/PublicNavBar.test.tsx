import { render, screen } from '@testing-library/react';
import { PublicNavBar } from '.';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  usePathname: () => 'localhost:3000/example/path',
}));

describe('PublicNavBar component', () => {
  test('renders the PublicNavBar match snapshot', () => {
    const { container } = render(<PublicNavBar />);
    expect(container).toMatchSnapshot();
  });

  test('renders the PublicNavBar with children', () => {
    render(<PublicNavBar />);
    expect(screen.getByText('Boards')).toBeInTheDocument();
  });
});
