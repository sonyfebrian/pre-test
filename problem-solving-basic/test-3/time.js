function timeConversion(s) {
  const timeArr = s.split(":");
  const hours = parseInt(timeArr[0], 10);
  const minutes = parseInt(timeArr[1], 10);
  const seconds = parseInt(timeArr[2].substring(0, 2), 10);
  const period = timeArr[2].substring(2);

  let convertedHours = hours;
  if (period === "PM" && hours !== 12) {
    convertedHours += 12;
  } else if (period === "AM" && hours === 12) {
    convertedHours = 0;
  }

  const result = `${convertedHours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return result;
}

const time12Hour = "12:01:00AM";
const time24Hour = timeConversion(time12Hour);
console.log(time24Hour);
