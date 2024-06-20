import { render, screen } from '@testing-library/react';
import { NavBar } from '.';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  usePathname: () => 'localhost:3000/example/path',
}));

describe('NavBar component', () => {
  test('renders the NavBar match snapshot', () => {
    const { container } = render(<NavBar />);
    expect(container).toMatchSnapshot();
  });

  test('renders the NavBar with children', () => {
    render(<NavBar />);
    expect(screen.getByText('Boards')).toBeInTheDocument();
  });
});
