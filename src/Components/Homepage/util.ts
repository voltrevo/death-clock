export function toVerboseDurationString(preciseYears: number) {
  let secondsLeft = Math.round(preciseYears * 365.24 * 86400);

  const years = Math.floor(secondsLeft / (365.24 * 86400));
  secondsLeft -= years * 365.24 * 86400;

  const weeks = Math.floor(secondsLeft / (7 * 86400));
  secondsLeft -= weeks * 7 * 86400;

  const days = Math.floor(secondsLeft / 86400);
  secondsLeft -= days * 86400;

  const hours = Math.floor(secondsLeft / 3600);
  secondsLeft -= hours * 3600;

  const minutes = Math.floor(secondsLeft / 60);
  secondsLeft -= minutes * 60;

  const seconds = secondsLeft;

  return [
    `${years} years`,
    `${weeks} weeks`,
    `${days} days`,
    `${hours} hours`,
    `${minutes} minutes`,
    `and ${seconds} seconds`,
  ].join(', ');
}
