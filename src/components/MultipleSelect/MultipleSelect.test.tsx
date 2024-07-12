import { act, fireEvent, render, screen } from '@testing-library/react';

// Components
import { MultipleSelect } from '.';
import { Button } from '@/components';

import { PRIORITY_OPTIONS } from '@/ui/task/FilterWrapper';

const mockSelectedOptions = ['low', 'medium'];

const defaultProps = {
  id: 'dropdown',
  label: 'Select options',
  options: PRIORITY_OPTIONS,
  onChange: jest.fn(),
};

describe('Dropdown Component', () => {
  test('Should match snapshot', () => {
    const comp = render(<MultipleSelect {...defaultProps} />);
    expect(comp).toMatchSnapshot();
  });

  test('Should show the title', () => {
    const { getByText } = render(
      <MultipleSelect {...defaultProps} title="Priority" />,
    );
    const comp = getByText('Priority');
    expect(comp).toBeInTheDocument();
  });

  test('Should show options', async () => {
    render(<MultipleSelect {...defaultProps} />);
    const text = screen.getByTestId('multiple-select');
    await fireEvent.click(text);
    const options = screen.getByTestId('options');
    expect(options).toBeInTheDocument();
  });

  test('Should render correct number of options', async () => {
    render(<MultipleSelect {...defaultProps} />);
    const text = screen.getByTestId('multiple-select');
    await fireEvent.click(text);
    const options = screen.getByTestId('options');
    expect(options.children).toHaveLength(PRIORITY_OPTIONS.length);
  });

  test('Should call onSelect when select option', async () => {
    const { getByTestId, getByText } = render(
      <div>
        <MultipleSelect
          {...defaultProps}
          selectedOptions={mockSelectedOptions}
        />
        <Button onClick={jest.fn()}>Click me</Button>
      </div>,
    );
    const text = getByTestId('multiple-select');
    fireEvent.click(text);
    const selectedOption = getByTestId('multiple-select-low');
    fireEvent.click(selectedOption);
    const button = getByText('Click me');

    await act(() => fireEvent.mouseDown(button));
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  test('Should call onRemove when remove selected option', async () => {
    const { getByTestId, getByText } = render(
      <div>
        <MultipleSelect
          {...defaultProps}
          selectedOptions={mockSelectedOptions}
        />
        <Button onClick={jest.fn()}>Click me</Button>
      </div>,
    );
    const text = getByTestId('multiple-select');
    fireEvent.click(text);
    const selectedOption = getByTestId('multiple-select-medium');
    fireEvent.click(selectedOption);
    const button = getByText('Click me');

    await act(() => fireEvent.mouseDown(button));
    expect(defaultProps.onChange).toHaveBeenCalledTimes(2);
  });
});
