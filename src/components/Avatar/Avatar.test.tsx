import { render, screen } from '@testing-library/react';

// Components
import { Avatar } from '.';

const mockProps = {
  src: 'https://i.seadn.io/gae/gctNTZKmTRG5z7A56d1GOfh4pxaM_b-XtVrmFN4FE6269fZoIOhc5dtr4YVHaOGRiXkRBVTta91iuz344f6YpjCTda7sfOWC5qlp?auto=format&dpr=1&w=3840',
  name: 'test user',
};

describe('Avatar component', () => {
  test('Should match snapshot', () => {
    const comp = render(<Avatar {...mockProps} />);
    expect(comp).toMatchSnapshot();
  });

  test('Should has correct customClass', () => {
    render(<Avatar {...mockProps} customClass="custom-class" />);
    expect(screen.getByRole('img')).toHaveClass('custom-class');
  });

  test('Should render correct variant', () => {
    render(<Avatar {...mockProps} variant="circle" />);
    expect(screen.getByRole('img')).toHaveClass('rounded-full');
  });

  test('Should render fallback image', () => {
    const expectSrc = expect.stringContaining('ui-avatars.com');
    render(<Avatar name="test user" />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('srcset', expectSrc);
  });
});
