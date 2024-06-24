import { render, screen } from '@testing-library/react';

// Component
import { BaseModal } from '.';
import { fireEvent } from '@storybook/test';

const defaultProps = {
  title: 'Title',
  isOpen: true,
  onClose: jest.fn(),
};

describe('BaseModal Component', () => {
  test('Should match snapshot', () => {
    render(
      <BaseModal {...defaultProps}>
        <span>Content</span>
      </BaseModal>,
    );
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  test('Should call onClose when click close button', () => {
    render(
      <BaseModal {...defaultProps}>
        <span>Content</span>
      </BaseModal>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  test('should call the onClose function when the user clicks outside the modal', () => {
    render(
      <BaseModal {...defaultProps}>
        <span>Content</span>
      </BaseModal>,
    );
    const body = document.querySelector('body') as HTMLBodyElement;

    fireEvent.mouseDown(body);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
