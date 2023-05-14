import React, { useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import "moment/locale/es";
import { turnDateToMomentFormat } from "../services/helpers/DateService";

export default function BasicDatePicker(props) {
  moment.locale("es");

  let oldDateFormated;

  const handleDateChange = (givenDate) => {
    props.setSelectedDate(givenDate);
  };

  if (! props.didGet) {
    return (
      <p>Cargando</p>
    )
  } else if (props.oldDate) {
    oldDateFormated = moment(turnDateToMomentFormat(props.oldDate));
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}
                          locale={moment.locale()}>
      <DatePicker label="Elija una fecha"
                  onChange={handleDateChange}
                  value={oldDateFormated} />
    </LocalizationProvider>
  );
}
