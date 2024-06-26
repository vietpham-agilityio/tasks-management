import { fireEvent, render, screen } from '@testing-library/react';

// Components
import { Checkbox } from './index';

describe('Checkbox component', () => {
  test('renders the Checkbox with label and description', () => {
    render(<Checkbox label="Option 1" description="Description 1" />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
  });

  test('handle onChange event when click on checkbox', () => {
    const handleCheck = jest.fn();
    render(<Checkbox label="Option 1" id="option1" onChange={handleCheck} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleCheck).toHaveBeenCalledTimes(1);
  });

  test('handle onChange event when click on label', () => {
    const handleCheck = jest.fn();
    render(<Checkbox label="Option 1" id="option1" onChange={handleCheck} />);
    fireEvent.click(screen.getByText('Option 1'));
    expect(handleCheck).toHaveBeenCalledTimes(1);
  });
});
