import { fireEvent, render, screen } from '@testing-library/react';

// Components
import { Header } from '.';

const mockProps = {
  name: 'test user',
  avatarUrl:
    'https://i.seadn.io/gae/gctNTZKmTRG5z7A56d1GOfh4pxaM_b-XtVrmFN4FE6269fZoIOhc5dtr4YVHaOGRiXkRBVTta91iuz344f6YpjCTda7sfOWC5qlp?auto=format&dpr=1&w=3840',
  handleSearch: jest.fn(),
};

describe('Header component', () => {
  test('Should match snapshot', () => {
    const comp = render(<Header {...mockProps} />);
    expect(comp).toMatchSnapshot();
  });

  test('Should call handleSearch function', () => {
    render(<Header {...mockProps} />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Test input' },
    });
    expect(mockProps.handleSearch).toHaveBeenCalledTimes(1);
  });
});
