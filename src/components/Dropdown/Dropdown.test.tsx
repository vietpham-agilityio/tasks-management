import { render, screen, fireEvent } from '@testing-library/react';

// Component
import { Dropdown } from '.';

import { SORT_OPTIONS } from '@/ui/task/FilterWrapper';

const mockProps = {
  options: SORT_OPTIONS,
  onSelect: jest.fn(),
};

describe('Dropdown component', () => {
  test('Render component correctly', () => {
    expect(render(<Dropdown {...mockProps} />)).toMatchSnapshot();
  });

  test('Show the selected item', () => {
    const { getByText } = render(
      <Dropdown {...mockProps} selectedItemValue="desc" />,
    );
    const comp = getByText('Desc');
    expect(comp).toBeInTheDocument();
  });

  test('Show list options', async () => {
    render(<Dropdown {...mockProps} />);
    const button = screen.getByRole('button');
    await fireEvent.click(button);
    const options = screen.getByTestId('options');
    expect(options).toBeInTheDocument();
  });

  test('Should render correct number of options', async () => {
    render(<Dropdown {...mockProps} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    await fireEvent.click(button);
    const options = screen.getByTestId('options');
    expect(options.children).toHaveLength(SORT_OPTIONS.length);
  });

  test('Should call onSelect function', async () => {
    render(<Dropdown {...mockProps} />);
    const button = screen.getByRole('button');
    await fireEvent.click(button);
    await fireEvent.click(screen.getByText('Desc'));
    expect(mockProps.onSelect).toHaveBeenCalledTimes(1);
  });
});
