import { WEEK_DAYS } from '../constants/weekDay';

export const getWeekDay = (date: string): string => {
  if (!date) return '';

  const parsedDate = new Date(date);
  const weekDayIndex = parsedDate.getDay();

  return WEEK_DAYS[weekDayIndex];
};
