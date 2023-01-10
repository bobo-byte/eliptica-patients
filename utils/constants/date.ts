import {
  parse,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
} from "date-fns";
/** Regex pattern for validating the DD/MM/YYYY pattern */
export const DDMMYYYY_REGEX_PATTERN =
  /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
/**
 * Strips the time and timezone from ISO format
 * @param date a {@link Date} object to strip
 * @returns
 */
export function stripTimeFromDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

/**
 * Validates if the birthdate is indeed valid
 * @param date a date pattern of {@link DDMMYYYY_REGEX_PATTERN}
 * @returns an error message or `true`
 */
export function validateBirthDate(date: string) {
  const isValidDate = DDMMYYYY_REGEX_PATTERN.test(date);
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  if (!isValidDate) {
    return "Birth date is invalid DD/MM/YYYY";
  }

  if (isValidDate) {
    const birthdate = parse(date, "MM-DD-YYYY", new Date(date));
    const birthDay = birthdate.getDay();
    const birthMonth = birthdate.getMonth();
    const birthYear = birthdate.getFullYear();

    const current = birthYear === currentMonth;
    const future = birthYear > currentYear;

    if (current) {
      if (birthDay > currentDay) return "The Birth day cannot be in the future";

      if (birthMonth > currentMonth)
        return "The Birth month cannot be in the future";
    }

    if (future) return "Birth year cannot be in the future";
  }

  return true;
}

/**
 * Function converts client date to supabase standard
 * @param date DD/MM/YYYY
 * @returns converted string
 */
export function parseDateFromClientToSupabase(date: string) {
  const ndate = date.split("/");

  const [birthDay, birthMonth, birthYear] = ndate;

  return `${birthYear}-${birthMonth}-${birthDay}`;
}

/**
 * Converts supabase date to consumer standard
 * @param date  a {@link DDMMYYYY_REGEX_PATTERN} with `-` instead of  `/`
 * @returns
 */
export function parseDateFromSupabase(date: string) {
  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year}`;
}
/**
 * Uses {@link date-fns} to find the time passed from now and specified date
 */
export function getTimePassed(date: Date | string | undefined): string {
  if (date === undefined) return "undefined date";

  const currentDate = new Date();
  const pastDate = new Date(date);

  const seconds = differenceInSeconds(currentDate, pastDate);
  const minutes = differenceInMinutes(currentDate, pastDate);
  const hours = differenceInHours(currentDate, pastDate);
  const days = differenceInDays(currentDate, pastDate);
  const weeks = differenceInWeeks(currentDate, pastDate);
  const months = differenceInMonths(currentDate, pastDate);
  const years = differenceInYears(currentDate, pastDate);

  if (years > 0) {
    return `${years} years`;
  } else if (months > 0) {
    return `${months} months`;
  } else if (weeks > 0) {
    return `${weeks} weeks`;
  } else if (days > 0) {
    return `${days} days`;
  } else if (hours > 0) {
    return `${hours} hours`;
  } else if (minutes > 0) {
    return `${minutes} minutes`;
  } else if (seconds > 0) {
    return `${seconds} seconds`;
  } else {
    return "0 seconds";
  }
}
