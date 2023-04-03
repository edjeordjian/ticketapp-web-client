/* eslint-disable require-jsdoc */
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UploadAndDisplayImage from "./UploadAndDisplayImage";
import BasicDatePicker from "./BasicDatePicker";
import { purple } from "@mui/material/colors";
import InputTags from "./TagField";
import {useEffect, useState} from "react";

import {BlankLine} from "./BlankLine";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";
import {getTo} from "../services/helpers/RequestHandler";
import {EVENT_TYPES_URL} from "../constants/URLs";
import {getKeys} from "../services/helpers/JsonHelpers";

// eslint-disable-next-line require-jsdoc
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        TicketApp
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: "#f44336",
    },
  },
});

export default function BasicForm() {
  const [name, setName] = useState("");

  const [richDescription, setRichDescription] = useState("");

  const [capacity, setCapacity] = useState("");

  const [types, setTypes] = useState([]);

  const [selectableTypes, setSelectableTypes] = React.useState([]);

  const [loading, setLoading] = useState(true);

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const type_ids = getKeys(types, selectableTypes);

    const eventPayload = {
      name: name,
      richDescription: richDescription,
      capacity: capacity,
      types: type_ids
    };

    console.log(eventPayload);
  };

  useEffect( () => {
    getTo(`${process.env.REACT_APP_BACK_HOST}${EVENT_TYPES_URL}`)
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
    <ThemeProvider theme={theme}>
      <Container component="main" sx={{ bgcolor: "#eeeeee" }}>
        <CssBaseline />
        <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
            }}
        >
          <Typography component="h1" variant="h5">
            Nuevo evento
          </Typography>
          <UploadAndDisplayImage size="1160em"></UploadAndDisplayImage>

            <Typography component="h1" variant="h5">
              General
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="stretch"
            >
              <Grid item xs={6}>
                <BlankLine/>

                <ReactQuill value={richDescription}
                            theme="snow"
                            onChange={handleRichDescriptionChange}
                            style={{ height: '200px' }}/>
              </Grid>

              <Grid item md={4}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <BlankLine/>

                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="Nombre"
                      name="name"
                      onChange={handleNameChange}
                    />
                  </Grid>

                  <Grid item sx={{ mt: 2 }}>
                    <TextField
                      type="number"
                      required
                      fullWidth
                      id="quantity"
                      label="Cantidad de entradas"
                      name="quantity"
                      onChange={handleCapacityChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="stretch"
            sx={{ mt: 5 }}
            spacing={2}
          >
            <Grid item  md={4}>

              {loading ? (
                  <p></p>
              ) : (
                  <InputTags onTypesChange={handleTypesChange}
                             selectableTypes={selectableTypes}> </InputTags>
              )}
            </Grid>
            <Grid item md={4}>
              <BasicDatePicker></BasicDatePicker>
            </Grid>
            
          </Grid>
          <Typography component="h1" variant="h5" sx={{ mt: 5 }}>
            Galería
          </Typography>
          <UploadAndDisplayImage size="200px"></UploadAndDisplayImage>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Crear evento
          </Button>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
