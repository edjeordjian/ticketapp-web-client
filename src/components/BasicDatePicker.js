import React, { useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import "moment/locale/es";

export default function BasicDatePicker(props) {
  moment.locale("es");
  const [value, setValue] = React.useState(moment('2022-04-17'));

  const handleDateChange = (givenDate) => {
    props.setSelectedDate(givenDate);
  };

  if (props.oldDate === null) {
    return (
      <p>Cargando</p>
    )
  }
  let oldDateFormated = moment(props.oldDate)

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} locale={moment.locale()}>
      <DatePicker
        label="Elija una fecha"
        onChange={handleDateChange}
        value={oldDateFormated}
      />
    </LocalizationProvider>
  );
}
