export function toLocalISOString(date) {
  const localDate = new Date(date - date.getTimezoneOffset() * 60000);

  localDate.setSeconds(null);
  localDate.setMilliseconds(null);
  return localDate.toISOString().slice(0, -1);
}