export default function myDateFormat({ date, isDateTime = true }) {
  var mydate = new Date(date);
  var day = mydate.getDay();
  var month = mydate.getMonth();
  var date = mydate.getDate();
  var year = mydate.getYear();
  if (year < 1000) year += 1900;
  if (date < 10) date = "0" + date;
  var dayr = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );
  var monr = new Array(
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octomber",
    "November",
    "December"
  );
  return (
    <>
      <p>
        {date}
        {monr[month]}
      </p>
      <p>{dayr[day]}</p>
    </>
  );
}
