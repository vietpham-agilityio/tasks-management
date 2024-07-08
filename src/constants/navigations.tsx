// Models
import { Navigation } from '@/models';

// Icons
import { BoardIcon, ProjectIcon, TaskIcon, UserIcon } from '@/icons';

// Utils
import { getQueryParams } from '@/utils';

export const ROUTES = {
  // Authentication
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  FORGET_PASSWORD: '/forget-password',
  // Admin
  ADMIN_BOARDS: '/admin/boards',
  ADMIN_PROJECT_LIST: '/admin/projects',
  ADMIN_PROJECT_DETAIL: (id?: string) => `/admin/projects/${id}`,
  ADMIN_UPSERT_PROJECT: (id?: string) =>
    `/admin/projects/upsert${getQueryParams({ id })}`,
  ADMIN_TASK_LIST: '/admin/tasks',
  ADMIN_TASK_DETAIL: (id?: string) => `/admin/tasks/${id}`,
  ADMIN_CREATE_TASK: '/admin/tasks/create',
  // Public Pages
  BOARDS: '/boards',
  PROJECT_LIST: '/projects',
  PROJECT_DETAIL: (slug?: string) => `/projects/${slug}`,
  TASK_LIST: '/tasks',
  TASK_DETAIL: (slug?: string) => `/tasks/${slug}`,
};

export const NAVIGATION_LABELS = {
  SIGN_IN: 'Sign In',
  SIGN_UP: 'Sign Up',
  BOARDS: 'Boards',
  PROJECTS: 'Projects',
  TASKS: 'Tasks',
};

export const NAVIGATION_ICONS = {
  BOARDS: <BoardIcon customClass="w-4 h-4" />,
  PROJECTS: <ProjectIcon customClass="w-4 h-4" />,
  TASKS: <TaskIcon customClass="w-4 h-4" />,
  SIGN_IN: <UserIcon customClass="w-4 h-4" />,
};

export const ADMIN_NAVIGATION_LIST: Navigation[] = [
  {
    href: ROUTES.ADMIN_BOARDS,
    label: NAVIGATION_LABELS.BOARDS,
    icon: NAVIGATION_ICONS.BOARDS,
  },
  {
    href: ROUTES.ADMIN_PROJECT_LIST,
    label: NAVIGATION_LABELS.PROJECTS,
    icon: NAVIGATION_ICONS.PROJECTS,
  },
  {
    href: ROUTES.ADMIN_TASK_LIST,
    label: NAVIGATION_LABELS.TASKS,
    icon: NAVIGATION_ICONS.TASKS,
  },
];

export const PUBLIC_NAVIGATION_LIST: Navigation[] = [
  {
    href: ROUTES.BOARDS,
    label: NAVIGATION_LABELS.BOARDS,
    icon: NAVIGATION_ICONS.BOARDS,
  },
  {
    href: ROUTES.PROJECT_LIST,
    label: NAVIGATION_LABELS.PROJECTS,
    icon: NAVIGATION_ICONS.PROJECTS,
  },
  {
    href: ROUTES.TASK_LIST,
    label: NAVIGATION_LABELS.TASKS,
    icon: NAVIGATION_ICONS.TASKS,
  },
  {
    href: ROUTES.SIGN_IN,
    label: NAVIGATION_LABELS.SIGN_IN,
    icon: NAVIGATION_ICONS.SIGN_IN,
  },
];
