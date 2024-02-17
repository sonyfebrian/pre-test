function timeConversion(s) {
  const [hours, minutes, seconds, period] = s
    .match(/^(\d{2}):(\d{2}):(\d{2})(AM|PM)$/)
    .slice(1);

  let convertedHours = parseInt(hours, 10);

  if (period === "PM" && convertedHours !== 12) {
    convertedHours += 12;
  } else if (period === "AM" && convertedHours === 12) {
    convertedHours = 0;
  }

  return `${convertedHours.toString().padStart(2, "0")}:${minutes}:${seconds}`;
}

const time12Hour = "07:05:45PM";
const time24Hour = timeConversion(time12Hour);
console.log(time24Hour);
