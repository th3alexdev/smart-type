export function convertStringToDate(date: string | Date): Date {
  if (typeof date === "string") {
    return new Date(date);
  } else {
    return date;
  }
}