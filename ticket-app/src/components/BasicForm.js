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
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" sx={{ bgcolor: "#eeeeee" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography component="h1" variant="h5">
            Nuevo evento
          </Typography>
          <UploadAndDisplayImage></UploadAndDisplayImage>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 5 }}
          >
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
                <TextField
                  name="description"
                  required
                  fullWidth
                  multiline
                  rows={4}
                  id="description"
                  label="Descripcion"
                />
              </Grid>
              <Grid md={4} spacing={2}>
                <Grid container direction="column">
                  <Grid item>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="Nombre"
                      name="name"
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
            >
              
              <Grid item xs={6}>
                <InputTags></InputTags>
              </Grid>

              <Grid md={4} spacing={2}>
                <Grid item>
                  <BasicDatePicker></BasicDatePicker>
                </Grid>
              </Grid>
            </Grid>
            <Typography component="h1" variant="h5"  sx={{ mt: 5 }}>
                Galería
              </Typography>
              <UploadAndDisplayImage></UploadAndDisplayImage>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Crear evento
            </Button>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
