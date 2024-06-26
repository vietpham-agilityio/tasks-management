// Models
import { User } from '@/types';
import { Project } from '@/models';

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
