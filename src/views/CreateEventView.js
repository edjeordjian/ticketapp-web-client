import * as React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UploadAndDisplayImage from "../components/UploadAndDisplayImage";
import BasicDatePicker from "../components/BasicDatePicker";
import InputTags from "../components/TagField";
import Copyright from "../components/Copyright";
import DashboardDrawer from "../components/DashboardDrawer";
import {getTo, postTo} from "../services/helpers/RequestHelper";
import {EVENT_TYPES_URL, EVENT_URL, EVENTS_PATH} from "../constants/URLs";

import {BlankLine} from "../components/BlankLine";
import 'react-quill/dist/quill.snow.css';
import {getKeys} from "../services/helpers/JsonHelpers";
import BasicTimePicker from "../components/BasicTimePicker";
import ReactQuill from "react-quill";
import {createEventStyle as createEventStyles} from "../styles/events/CreateEventStyle";
import BasicBtn from "../components/BasicBtn";
import SweetAlert2 from 'sweetalert2';

import {CREATED_EVENT_LBL} from "../constants/EventConstants";
import {useNavigate} from "react-router-dom";

export default function CreateEventView() {
  const [name, setName] = React.useState("");

  const [richDescription, setRichDescription] = React.useState("");

  const [capacity, setCapacity] = React.useState("");

  const [types, setTypes] = React.useState([]);

  const [selectableTypes, setSelectableTypes] = React.useState([]);

  const [loading, setLoading] = React.useState(true);

  const [selectedDate, setSelectedDate] = React.useState("");

  const [selectedTime, setSelectedTime] = React.useState("");

  const [address, setAddress] = React.useState("");

  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleRichDescriptionChange = (html) => {
    setRichDescription(html);
  }

  const handleCapacityChange = (event) => {
    setCapacity(event.target.value);
  }

  const handleTypesChange = (value) => {
    setTypes(value);
  }

  const handleSelectedDate = (value) => {
    setSelectedDate(value);
  }

  const handleSelectedTime = (value) => {
    setSelectedTime(value);
  }

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const typeIds = getKeys(types, selectableTypes);

    const eventPayload = {
      ownerId: "1",

      name: name,

      description: richDescription,

      capacity: capacity,

      types: typeIds,

      address: address,

      date: selectedDate.format('YYYY-MM-DD'),

      time: selectedTime.format("HH:mm"),

      pictures: []
    };

    postTo(`${process.env.REACT_APP_BACKEND_HOST}${EVENT_URL}`,
        eventPayload)
        .then(res => {
          if (res.error) {
            SweetAlert2.fire({
              icon: 'error',
              title: res.error
            }).then();
          }

          SweetAlert2.fire({
            icon: 'info',
            title: CREATED_EVENT_LBL
          }).then(res => navigate(EVENTS_PATH))
        });
  };

  React.useEffect( () => {
    getTo(`${process.env.REACT_APP_BACKEND_HOST}${EVENT_TYPES_URL}`)
        .then(res => {
          if (res.error !== undefined) {
            alert(res.error);
          } else {
            setSelectableTypes(res.event_types);
          }

          setLoading(false);
        })
  }, [] );

  return (
    <main style={{ backgroundColor: "#eeeeee", minHeight: "100vh" }}>
      <DashboardDrawer />

      <Box style={createEventStyles.formContainer}>
        <Typography component="h1" style={createEventStyles.title}
          >Foto de Portada
        </Typography>

        <UploadAndDisplayImage size="100%" height="400px" />


          <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="stretch"
              sx={{ mt: 2 }}
              spacing={2}
          >
            <Grid item mt={2}>
              <TextField
                  style={{ background: "white" }}
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  name="name"
                  onChange={handleNameChange}/>

              <BlankLine/>

              {loading ? (
                  <p></p>
              ) : (
                  <InputTags onTypesChange={handleTypesChange}
                             selectableTypes={selectableTypes}> </InputTags>
              )}

              <BlankLine/>

              <TextField
                  style={{ background: "white" }}
                  required
                  fullWidth
                  id="address"
                  label="Dirección"
                  name="address"
                  onChange={handleAddressChange}/>

              <BlankLine/>

              <Typography style={createEventStyles.subtitle}
                >Acerca del evento
              </Typography>

              <ReactQuill value={richDescription}
                          theme="snow"
                          onChange={handleRichDescriptionChange}
                          style={{
                            height: '300px',
                            width: '800px'
                          }}/>
            </Grid>

            <Grid item md={2}>
              <Grid container direction="column" spacing={4}>
                <Grid item sx={{ mt: 2 }}>
                  <TextField
                    required
                    fullWidth
                    inputProps={{ type: "number", min: 0, step: 1 ,pattern:"[0-9]*"}}
                    id="quantity"
                    label="Cantidad de entradas"
                    name="quantity"
                    onChange={handleCapacityChange}
                  />
                </Grid>
              </Grid>

            <BlankLine/>


            <BasicDatePicker setSelectedDate={handleSelectedDate}/>

            <BlankLine/>

            <BasicTimePicker setSelectedTime={handleSelectedTime}/>
          </Grid>

          <BlankLine/>
        </Grid>

        <BlankLine/>

        <BlankLine/>

        <BlankLine/>

        <BlankLine/>

        <Typography component="h2" style={createEventStyles.subTitle}
        >Galería
        </Typography>

        <BlankLine/>

        <Grid item md={10} item md={10}>
        <Grid container direction="row" spacing={2}>
          <Box style={createEventStyles.galleryContainer}>

            <Grid item sx={{ px: 2 }}>
            <UploadAndDisplayImage
                size="300px"
                height="300px"
            />
            </Grid>

            <Grid item sx={{ px: 2 }}>
            <UploadAndDisplayImage
                size="300px"
                height="300px"
            />
            </Grid>

            <Grid item sx={{ px: 2 }}>
            <UploadAndDisplayImage
                size="300px"
                height="300px"
            />
            </Grid>

            <Grid item sx={{ px: 2 }}>
            <UploadAndDisplayImage
                size="300px"
                height="300px"
            />
            </Grid>

          </Box>
        </Grid>
        </Grid>

        <BlankLine/>

        <BlankLine/>

        <BasicBtn label={"Crear evento"} onClick={handleSubmit}/>
      </Box>
    </main>
  );
}
