import dayjs from 'dayjs';

// Constants
import { DATE_FORMAT } from '@/constants';

export const formatDate = (
  date: string | Date,
  format = DATE_FORMAT.Primary,
): string =>
  dayjs(typeof date === 'string' ? new Date(date) : date).format(format);

/**
 * Calculates the time spend between two dates in hours and minutes.
 *
 * @param {string | Date} startDate - The start date and time.
 * @param {string | Date} dueDate - The due date and time.
 * @returns {{ hours: number, minutes: number }} - An object containing the hours and minutes difference.
 */

export const calculateEstimateTime = (
  startDate: string | Date,
  dueDate: string | Date,
): { hours: number; minutes: number } => {
  const startTime = new Date(startDate);
  const dueTime = new Date(dueDate);

  const timeSpend = dueTime.getTime() - startTime.getTime();

  // Convert time spent to hours and minutes
  const hours = Math.floor(timeSpend / (1000 * 60 * 60));
  const minutes = Math.floor((timeSpend % (1000 * 60 * 60)) / (1000 * 60));

  return { hours, minutes };
};
