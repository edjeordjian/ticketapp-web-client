import * as React from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider,
         DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import 'moment/locale/es';


export default function BasicDatePicker() {
    moment.locale('es');

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}  locale={moment.locale()}>
        <DatePicker label="Elija una fecha"/>
    </LocalizationProvider>
  );
}