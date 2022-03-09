// sort on mockdata type
const longDate = (unformattedDate: Date | string) => {
  const formatted = new Date(unformattedDate);
  const [, date, month, year, time] = formatted
    .toUTCString()
    .split(",")[1]
    .split(" ");
  const [hours, minutes] = time.split(":");
  const timeWithoutSeconds = hours + ":" + minutes;
  return date + " " + month + " " + year + ", " + timeWithoutSeconds;
};

export default longDate;
