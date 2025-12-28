import humanizeDuration from 'humanize-duration';
import { lowerCase, startCase } from 'lodash-es';
import { dayjsLibInstance } from './dayjs';

export function sentenceCase(s: string) {
  return startCase(lowerCase(s));
}

export function timeFromNowDisplayable(dateAsString?: string): string {
  if (!dateAsString)
    return '';
  try {
    const dayInstance = dayjsLibInstance(dateAsString, {
      utc: true,
    });
    return dayInstance.fromNow() ?? '';
  }
  catch (error) {
    console.warn('Error while displaying dateAsString', dateAsString, error);
    return '';
  }
}

export function formatNumberNormal(number: string | number): string {
  const numberAsInt = Number(number);
  if (Number.isNaN(numberAsInt))
    return '';
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
  }).format(numberAsInt);
}

export function formatDurationInHumanReadable(
  durationInSeconds?: number,
): string {
  if (durationInSeconds == null || durationInSeconds < 0)
    return '';

  const d = dayjsLibInstance.duration(durationInSeconds, 'seconds');

  const hours = Math.floor(d.asHours());
  const minutes = d.minutes();
  const seconds = Math.floor(d.seconds());

  if (hours > 0) {
    return seconds > 0
      ? `${hours}h ${seconds}s`
      : `${hours}h`;
  }

  if (minutes > 0) {
    return seconds > 0
      ? `${minutes}m ${seconds}s`
      : `${minutes}m`;
  }

  return `${seconds || 1}s`;
}

/**
 * @deprecated since version
 */
export function formatDurationInHumanReadableUnused(durationInSeconds: number): string {
  if (!durationInSeconds)
    return '';
  return humanizeDuration(durationInSeconds * 1000);
}
