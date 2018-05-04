export function toVerboseDurationString(years: number) {
  const wholeYears = Math.floor(years);

  const weeks = (365.24 / 7) * (years - wholeYears);
  const wholeWeeks = Math.floor(weeks);

  const days = 7 * (weeks - wholeWeeks);
  const wholeDays = Math.floor(days);

  const hours = 24 * (days - wholeDays);
  const wholeHours = Math.floor(hours);

  const minutes = 60 * (hours - wholeHours);
  const wholeMinutes = Math.floor(minutes);

  const seconds = Math.ceil(60 * (minutes - wholeMinutes));

  return [
    `${wholeYears} years`,
    `${wholeWeeks} weeks`,
    `${wholeDays} days`,
    `${wholeHours} hours`,
    `${wholeMinutes} minutes`,
    `and ${seconds} seconds`,
  ].join(', ');
}
