import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function BasicTimePicker(props) {
  let oldTimeFormatted;

  const handleTimeChange = (newTime) => {
    props.setSelectedTime(newTime);
  };

  if (! props.didGet) {
    return (
      <p>Cargando</p>
    )
  } else if (props.oldTime) {
      oldTimeFormatted = props.oldTime;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker label="Elija una hora"
                        value={oldTimeFormatted}
                        onChange={handleTimeChange} />
    </LocalizationProvider>
  );
}
