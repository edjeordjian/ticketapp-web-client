/* eslint-disable require-jsdoc */
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
import BasicBtn from "../components/BasicBtn";

const styles = {
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: '15px'
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: '15px'
  },
  formContainer: {
    marginLeft: '220px',
    padding: '25px'
  },
  galleryContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

}

export default function CreateEventView() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const createEventBtn = () => {
    return (
      <BasicBtn type="submit" label="Crear evento" styles={{marginTop: '15px', justifySelf: 'flex-end'}}/>
    );
  }

  const basicTextInput = (id, label) => {
    return (
      <TextField
        required
        fullWidth
        id={id}
        label={label}
        name={id}/>
    )
  }

  return (
    <main style={{backgroundColor: "#eeeeee", minHeight: '100vh'}}>
      <DashboardDrawer/>
        <Box style={styles.formContainer}>
          <Typography component="h1" style={styles.title}>
            Nuevo evento
          </Typography>
          <UploadAndDisplayImage size="100%" height='400px'/>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 5 }}
          >
            <Typography component="h2" style={styles.subTitle}>
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
              <Grid item md={4}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <TextField
                      style={{background: 'white'}}
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
          </Box>
          <Box style={styles.row}>
            <InputTags/>
            <BasicDatePicker/>
          </Box>
          <Box style={styles.row}>
            {basicTextInput('adress', 'Dirección')}
          </Box>
          <Typography component="h2" style={styles.subTitle}>
            Galería
          </Typography>
          <Box  style={styles.galleryContainer}>
            <UploadAndDisplayImage size="300px" height='300px'></UploadAndDisplayImage>
            <UploadAndDisplayImage size="300px" height='300px'></UploadAndDisplayImage>
            <UploadAndDisplayImage size="300px" height='300px'></UploadAndDisplayImage>
            <UploadAndDisplayImage size="300px" height='300px'></UploadAndDisplayImage>
          </Box>

          {createEventBtn()}
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </main>
  );
}
