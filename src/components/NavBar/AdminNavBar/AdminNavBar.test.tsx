import { render, screen } from '@testing-library/react';
import { AdminNavBar } from '.';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  usePathname: () => 'localhost:3000/example/path',
}));

describe('AdminNavBar component', () => {
  test('renders the AdminNavBar match snapshot', () => {
    const { container } = render(<AdminNavBar />);
    expect(container).toMatchSnapshot();
  });

  test('renders the AdminNavBar with children', () => {
    render(<AdminNavBar />);
    expect(screen.getByText('Boards')).toBeInTheDocument();
  });
});
