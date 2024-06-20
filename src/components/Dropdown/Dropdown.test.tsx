import { render, screen, fireEvent } from '@testing-library/react';

// Component
import { Dropdown } from '.';

const mockOptions = [
  {
    name: 'Option 1',
    value: '1',
  },
  {
    name: 'Option 2',
    value: '2',
  },
  {
    name: 'Option 3',
    value: '3',
  },
];

const mockProps = {
  options: mockOptions,
  onSelect: jest.fn(),
};

describe('Dropdown component', () => {
  test('Render component correctly', () => {
    expect(render(<Dropdown {...mockProps} />)).toMatchSnapshot();
  });

  test('Show the selected item', () => {
    render(<Dropdown {...mockProps} selectedItemValue="1" />);
    const comp = screen.getByText('Option 1');
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
    expect(options.children).toHaveLength(mockOptions.length);
  });

  test('Should call onSelect function', async () => {
    render(<Dropdown {...mockProps} />);
    const button = screen.getByRole('button');
    await fireEvent.click(button);
    await fireEvent.click(screen.getByText(/Option 1/i));
    expect(mockProps.onSelect).toHaveBeenCalledTimes(1);
  });
});
