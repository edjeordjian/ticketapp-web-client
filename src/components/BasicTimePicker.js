import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function BasicTimePicker(props) {

  const handleTimeChange = (newTime) => {
    props.setSelectedTime(newTime);
  };

  if (props.oldTime === null) {
    return (
      <p>Cargando</p>
    )
  }
  const [hourString, minute] = props.oldTime.split(":");
  const hour = +hourString % 24;
  let finalHour = (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
  let oldDateFormated = dayjs(finalHour,"HH:mm")
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker label="Elija una hora" value = {oldDateFormated} onChange={handleTimeChange} />
    </LocalizationProvider>
  );
}
