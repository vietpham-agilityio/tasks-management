import { render, screen } from '@testing-library/react';

// Components
import { AvatarGroup } from '.';

const mockListUsers = [
  {
    id: '1',
    name: 'Patrick Jordan',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    id: '2',
    name: 'Jeremiah Collins',
    avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
  },
  {
    id: '3',
    name: 'Gerald Garrett',
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
  },
  {
    id: '4',
    name: 'Ethel Mckinney',
    avatar: 'https://randomuser.me/api/portraits/women/19.jpg',
  },
  {
    id: '6',
    name: 'Kyle Allen',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '7',
    name: 'Florence Obrien',
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
  },
  {
    id: '8',
    name: 'Ruben Cunningham',
    avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
];

describe('AvatarGroup component', () => {
  test('Should match snapshot', () => {
    expect(render(<AvatarGroup listUsers={mockListUsers} />)).toMatchSnapshot();
  });

  test('Should show correct shorten items', () => {
    render(<AvatarGroup listUsers={mockListUsers} maxDisplayed={3} />);
    const comp = screen.getByTestId('avatar-group');
    expect(comp.children).toHaveLength(4);
  });
});
