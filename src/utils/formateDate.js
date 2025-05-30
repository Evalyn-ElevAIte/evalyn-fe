export function formatDateToWIB(dateString) {
  const date = new Date(dateString);

  const options = {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formatted = new Intl.DateTimeFormat("en-US", options).format(date);

  const [datePart, timePart] = formatted.split(", ");
  return `${datePart} at ${timePart}`;
}
