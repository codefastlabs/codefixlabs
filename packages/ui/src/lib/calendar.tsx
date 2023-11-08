import { isAfter, isBefore, isSameDay, parse } from 'date-fns';
import type * as React from 'react';
import type { DateRange, DayRender, Matcher } from 'react-day-picker';

export const dateRegex =
  /^(?<month>0?[1-9]|1[0-2])\/(?<day>0?[1-9]|[12][0-9]|3[01])\/\d{4}$/;
export const timeRegex =
  /^(?<hour>1[0-2]|0?[1-9]):(?<minute>[0-5]?[0-9]) (?<ampm>[AP]M)$/;

export function isValidDate(value: string): boolean {
  return dateRegex.test(value);
}

export const isValidTime = (value: string): boolean => {
  return timeRegex.test(value);
};

export const isDateOutOfRange = (
  date: Date,
  minDate?: Date,
  maxDate?: Date,
): boolean => {
  if (minDate && isBefore(date, minDate)) {
    return true;
  }

  return Boolean(maxDate && isAfter(date, maxDate));
};

export const handleInvalidDate = (
  event: React.ChangeEvent<HTMLInputElement>,
): void => {
  event.target.setCustomValidity('Invalid date');
};

export const handleValidDate = (
  event: React.ChangeEvent<HTMLInputElement>,
): void => {
  if (!event.target.checkValidity()) {
    event.target.setCustomValidity('');
  }
};

export const getCurrentDate = (value: string, date: Date): Date => {
  let currentDate = new Date(value);

  if (currentDate.toString() === 'Invalid Date') {
    currentDate = new Date();
  }

  currentDate.setHours(
    date.getHours() || 0,
    date.getMinutes() || 0,
    date.getSeconds() || 0,
    date.getMilliseconds() || 0,
  );

  return currentDate;
};

export function getCurrentTime(value: string, date: Date): Date {
  return parse(value, 'h:mm a', date);
}

export function getFormattedTime(value: string, date: Date): string {
  return value.length === 0
    ? date.toLocaleTimeString(undefined, { timeStyle: 'short' }) || ''
    : value.toUpperCase();
}

export function getFormattedDate(value: string, date: Date): string {
  return value.length === 0 ? date.toLocaleDateString() || '' : value;
}

export function matcherToArray(matcher?: Matcher | Matcher[]): Matcher[] {
  if (Array.isArray(matcher)) {
    return [...matcher];
  } else if (matcher !== undefined) {
    return [matcher];
  }

  return [];
}

export function createDate(
  date: Date | undefined,
  hours: number,
  minutes: number,
  seconds: number,
  milliseconds: number,
): Date {
  if (date) {
    return date;
  }

  return new Date(new Date().setHours(hours, minutes, seconds, milliseconds));
}

export function isSelectedDayDateRange(
  selectedDays: DayRender['selectedDays'],
): selectedDays is DateRange {
  return selectedDays !== undefined && 'from' in selectedDays;
}

export function getDateByRange(day: Date, range: DateRange): Date {
  const { from, to } = range;

  if (!from) {
    day.setHours(0, 0, 0, 0);

    return day;
  }

  if (!to && isBefore(day, from)) {
    day.setHours(
      from.getHours(),
      from.getMinutes(),
      from.getSeconds(),
      from.getMilliseconds(),
    );
    from.setHours(23, 59, 59, 999);

    return day;
  }

  if (!to) {
    day.setHours(23, 59, 59, 999);

    return day;
  }

  if (isSameDay(day, to)) {
    to.setHours(
      from.getHours(),
      from.getMinutes(),
      from.getSeconds(),
      from.getMilliseconds(),
    );
  }

  if (isBefore(day, from) || isSameDay(day, to)) {
    day.setHours(
      from.getHours(),
      from.getMinutes(),
      from.getSeconds(),
      from.getMilliseconds(),
    );

    return day;
  }

  if (isAfter(day, from)) {
    day.setHours(
      to.getHours(),
      to.getMinutes(),
      to.getSeconds(),
      to.getMilliseconds(),
    );

    return day;
  }

  return day;
}
