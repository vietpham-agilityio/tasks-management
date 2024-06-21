import dayjs from 'dayjs';

// Constants
import { DATE_FORMAT } from '@/constants';

export const formatDate = (
  date: string | Date,
  format = DATE_FORMAT.Primary,
): string =>
  dayjs(typeof date === 'string' ? new Date(date) : date).format(format);
