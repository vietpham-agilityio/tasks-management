import { fireEvent, render, screen } from '@testing-library/react';

// Components
import { Pagination } from './index';

describe('Pagination component', () => {
  test('renders the Pagination with children', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        onChangePageNumber={() => {}}
        pageSize={3}
        siblingCount={2}
        total={50}
        variant="outline"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(
      <Pagination
        currentPage={1}
        onChangePageNumber={handleClick}
        pageSize={3}
        siblingCount={2}
        total={50}
        variant="outline"
      />,
    );
    fireEvent.click(screen.getByText('1'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('disables click events', () => {
    const handleClick = jest.fn();
    render(
      <Pagination
        currentPage={1}
        customClass={{}}
        onChangePageNumber={handleClick}
        pageSize={3}
        siblingCount={2}
        total={50}
        startIcon={<span>Start</span>}
        variant="outline"
      />,
    );
    fireEvent.click(screen.getByText('Previous'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
