export const getDateFormat = ({ date, isDateTime = true }) => {
  const stringDate = new Date(date);
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
    stringDate
  );
  const month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(
    stringDate
  );
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
    stringDate
  );
  return isDateTime ? `${year}-${month}-${day}` : `${year}-${month}-${day}`;
};

export const showdateFormat = ({ date, isDateTime = true }) => {
  const stringDate = new Date(date);
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
    stringDate
  );
  const month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(
    stringDate
  );
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
    stringDate
  );
  return isDateTime ? `${day}/${month}/${year}` : `${day}/${month}/${year}`;
};

export const endTime = (endtime) => {
  // console.log("Common End Time: ",endtime);
  var splitTime = endtime.split(":");
  // console.log(splitTime);
  var endTime = "";
  if (splitTime[1] === "40") {
    if (splitTime[0] === "12") {
      endTime = `01:00`;
    } else {
      endTime = `${(parseInt(splitTime[0]) + 1)
        .toString()
        .padStart(2, "0")}:00`;
    }
  } else {
    endTime = `${splitTime[0]}:${parseInt(splitTime[1]) + 20}`;
  }
  console.log(endTime);
  return endTime;
};

export const convertTime12to24 = (time12h) => {
  console.log("converfun", time12h);
  const [time, modifier] = time12h.split(" ");

  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
};

export const convertTime12to24fornowTime = (time12h) => {
  const [time, modifier] = time12h.split(" ");

  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "12";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
};

export const convertAmpm = (_time) => {
  if (_time >= "10:00" && _time < "12:00") {
    return `${_time} AM`;
  } else {
    if (_time.split(":")[0] === "12") {
      return `${_time} PM`;
    } else {
      let int_time = parseInt(_time.split(":")[0]);
      int_time = int_time - 12;
      if (int_time < 12) {
        _time = int_time.toString().padStart(2, "0") + _time.substring(2);
      }

      return `${_time} PM`;
    }
  }
};
