import React, { useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import "moment/locale/es";

export default function BasicDatePicker(props) {
  moment.locale("es");
  //No se como pasarle el props.oldDate porque se queja de que puede ser nulo.
  const myMomentObject = moment("2019-08-10");
  const [value, setValue] = React.useState(myMomentObject);
  const handleDateChange = (givenDate) => {
    setValue(givenDate);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} locale={moment.locale()}>
      <DatePicker
        label="Elija una fecha"
        value={value}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
}
