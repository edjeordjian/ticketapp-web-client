import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Swal from "sweetalert2";

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
      oldTimeFormatted = dayjs(props.oldTime, `H:mm`);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker label="Elija una hora"
                        value={oldTimeFormatted}
                        onChange={handleTimeChange} />
    </LocalizationProvider>
  );
}
