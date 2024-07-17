// Models
import { User } from '@/types';
import { Project, Task } from '@/models';

// Constants
import { TASK_PRIORITY_VALUE, TASK_STATUS_VALUE } from './tasks';

export const MOCK_IMAGE_LINK =
  'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-james-wheeler-414612.jpg&fm=jpg';

export const MOCK_OVERVIEW_CARD_DATA = {
  id: '1',
  slug: 'website-design-1',
  title:
    'Website Design Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pulvinar, nisl sed commodo viverra, urna enim interdum ligula, vitae tempor lorem nibh tincidunt nisi. ',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pulvinar, nisl sed commodo viverra, urna enim interdum ligula, vitae tempor lorem nibh tincidunt nisi. Aliquam pellentesque metus non sollicitudin mattis. Cras quis auctor massa, at facilisis massa. Vivamus efficitur eros eget ante aliquet semper. Nunc tempus risus turpis, et sagittis felis consectetur eu. Integer luctus felis sed neque rutrum mattis. Quisque molestie tincidunt ligula, id fermentum dui dignissim quis. Nulla facilisi. Integer eget nulla a velit aliquet commodo vitae et leo. Aliquam erat volutpat. Cras nec arcu at dui blandit maximus. Curabitur rhoncus convallis arcu, et condimentum diam facilisis sollicitudin. Quisque in gravida nunc, sit amet semper tortor. Fusce dignissim pretium odio sit amet sagittis.',
  createdAt: new Date(2024, 20, 6, 15, 0, 0),
  image: MOCK_IMAGE_LINK,
};

export const MOCK_MEMBER_LIST: User[] = [
  {
    id: '1',
    name: 'John',
  },
  {
    id: '2',
    name: 'Mike',
  },
  {
    id: '3',
    name: 'Tom',
  },
  {
    id: '4',
    name: 'Jerry',
  },
  {
    id: '5',
    name: 'Cam',
  },
];

export const MOCK_PROJECT_LIST: Project[] = [
  {
    id: '1',
    slug: 'slug-1',
    title:
      'Website Design Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pulvinar, nisl sed commodo viverra, urna enim interdum ligula, vitae tempor lorem nibh tincidunt nisi. ',
    description: 'Description-1',
    image: '',
    createdAt: new Date(2024, 20, 6, 15, 0, 0),
    updatedAt: new Date(2024, 20, 6, 15, 0, 0),
    isArchived: false,
    isPublic: true,
    createdBy: '1',
  },
  {
    id: '2',
    slug: 'slug-2',
    title: 'Title-2',
    description: 'Description-2',
    image: '',
    createdAt: new Date(2024, 20, 6, 15, 0, 0),
    updatedAt: new Date(2024, 20, 6, 15, 0, 0),
    isArchived: false,
    isPublic: true,
    createdBy: '1',
  },
  {
    id: '3',
    slug: 'slug-3',
    title: 'Title-3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pulvinar, nisl sed commodo viverra, urna enim interdum ligula, vitae tempor lorem nibh tincidunt nisi. Aliquam pellentesque metus non sollicitudin mattis. Cras quis auctor massa, at facilisis massa. Vivamus efficitur eros eget ante aliquet semper. Nunc tempus risus turpis, et sagittis felis consectetur eu. Integer luctus felis sed neque rutrum mattis. Quisque molestie tincidunt ligula, id fermentum dui dignissim quis. Nulla facilisi. Integer eget nulla a velit aliquet commodo vitae et leo. Aliquam erat volutpat. Cras nec arcu at dui blandit maximus. Curabitur rhoncus convallis arcu, et condimentum diam facilisis sollicitudin. Quisque in gravida nunc, sit amet semper tortor. Fusce dignissim pretium odio sit amet sagittis.',
    image: '',
    createdAt: new Date(2024, 20, 6, 15, 0, 0),
    updatedAt: new Date(2024, 20, 6, 15, 0, 0),
    isArchived: false,
    isPublic: true,
    createdBy: '1',
  },
  {
    id: '4',
    slug: 'slug-4',
    title: 'Title-4',
    description: 'Description-4',
    image: '',
    createdAt: new Date(2024, 20, 6, 15, 0, 0),
    updatedAt: new Date(2024, 20, 6, 15, 0, 0),
    isArchived: false,
    isPublic: false,
    createdBy: '1',
  },
];

export const MOCK_TASK_LIST: Task[] = [
  {
    id: '1',
    slug: 'task-1',
    title: 'Design Landing Page',
    description:
      'Create the initial design for the landing page of the project.',
    image: 'https://example.com/image1.jpg',
    dueDate: new Date('2024-06-15'),
    status: TASK_STATUS_VALUE.IN_PROGRESS,
    priority: TASK_PRIORITY_VALUE.HIGH,
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date('2024-07-01'),
    isArchived: false,
    createdBy: 'user1',
    assignedTo: 'designer1',
    projectId: 'project1',
  },
  {
    id: '2',
    slug: 'task-2',
    title: 'Develop Backend API',
    description: 'Develop the backend API for the user management module.',
    dueDate: new Date('2024-07-20'),
    status: TASK_STATUS_VALUE.IN_PROGRESS,
    priority: TASK_PRIORITY_VALUE.MEDIUM,
    createdAt: new Date('2024-06-05'),
    updatedAt: new Date('2024-07-01'),
    isArchived: false,
    createdBy: 'user2',
    assignedTo: 'developer1',
    projectId: 'project2',
  },
  {
    id: '3',
    slug: 'task-3',
    title: 'Write Unit Tests',
    description: 'Write unit tests for the authentication module.',
    dueDate: new Date('2024-07-18'),
    status: TASK_STATUS_VALUE.NOT_STARTED,
    priority: TASK_PRIORITY_VALUE.HIGH,
    createdAt: new Date('2024-06-10'),
    updatedAt: new Date('2024-07-01'),
    isArchived: false,
    createdBy: 'user3',
    assignedTo: 'tester1',
    projectId: 'project3',
  },
  {
    id: '4',
    slug: 'task-4',
    title: 'Create User Documentation',
    description: 'Draft the user documentation for the application.',
    image: 'https://example.com/image2.jpg',
    dueDate: new Date('2024-07-22'),
    status: TASK_STATUS_VALUE.DONE,
    priority: TASK_PRIORITY_VALUE.LOW,
    createdAt: new Date('2024-06-15'),
    updatedAt: new Date('2024-07-01'),
    isArchived: false,
    createdBy: 'user4',
    assignedTo: 'writer1',
    projectId: 'project4',
  },
  {
    id: '5',
    slug: 'task-5',
    title: 'Conduct User Interviews',
    description:
      'Conduct user interviews to gather feedback on the beta version.',
    dueDate: new Date('2024-07-25'),
    status: TASK_STATUS_VALUE.NOT_STARTED,
    priority: TASK_PRIORITY_VALUE.LOW,
    createdAt: new Date('2024-06-20'),
    updatedAt: new Date('2024-07-01'),
    isArchived: false,
    createdBy: 'user5',
    assignedTo: 'researcher1',
    projectId: 'project5',
  },
];

export const MOCK_PROJECT_DATA = {
  id: '1',
  slug: 'slug-1',
  title:
    'Website Design Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pulvinar, nisl sed commodo viverra, urna enim interdum ligula, vitae tempor lorem nibh tincidunt nisi. ',
  description: 'Description-1',
  image: '',
  createdAt: new Date(2024, 20, 6, 15, 0, 0),
  updatedAt: new Date(2024, 20, 6, 15, 0, 0),
  isArchived: false,
  isPublic: true,
  createdBy: '1',
};

export const MOCK_PARTICIPATIONS = [
  {
    projectId: '1',
    createdAt: '1',
    userId: '1',
    name: '1',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    projectId: '1',
    createdAt: '1',
    userId: '2',
    name: '2',
    avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
  },
  {
    projectId: '1',
    createdAt: '1',
    userId: '3',
    name: '3',
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
  },
  {
    projectId: '1',
    createdAt: '1',
    userId: '4',
    name: '4',
    avatar: 'https://randomuser.me/api/portraits/women/19.jpg',
  },
  {
    projectId: '1',
    createdAt: '1',
    userId: '6',
    name: '6',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    projectId: '1',
    createdAt: '1',
    userId: '7',
    name: '7',
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
  },
  {
    projectId: '1',
    createdAt: '1',
    userId: '8',
    name: '8',
    avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
];
