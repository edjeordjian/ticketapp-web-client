import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UploadAndDisplayImage from "../components/UploadAndDisplayImage";
import BasicDatePicker from "../components/BasicDatePicker";
import InputTags from "../components/TagField";
import {getTo, postTo} from "../services/helpers/RequestHelper";
import {EVENT_ID_PARAM, EVENT_TYPES_URL, EVENT_URL, EVENT_VIEW_PATH, EVENTS_PATH} from "../constants/URLs";

import {BlankLine} from "../components/BlankLine";
import 'react-quill/dist/quill.snow.css';
import {getKeys} from "../services/helpers/JsonHelpers";
import BasicTimePicker from "../components/BasicTimePicker";
import ReactQuill from "react-quill";
import {createEventStyle as createEventStyles} from "../styles/events/CreateEventStyle";
import BasicBtn from "../components/BasicBtn";
import SweetAlert2 from 'sweetalert2';

import {CREATED_EVENT_LBL, GET_EVENT_ERROR, UPLOAD_IMAGE_ERR_LBL} from "../constants/EventConstants";
import {useNavigate, useSearchParams} from "react-router-dom";
import {uploadFile} from "../services/helpers/CloudStorageService";

import {basicButtonStyle} from "../styles/events/BasicButtonStyle";
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useMainContext} from "../services/contexts/MainContext";

import ReactHtmlParser from 'react-html-parser';

const ViewEventView = () => {
    const [name, setName] = React.useState("");

    const [richDescription, setRichDescription] = React.useState("");

    const [capacity, setCapacity] = React.useState("");

    const [types, setTypes] = React.useState([]);

    const [selectedDate, setSelectedDate] = React.useState(null);

    const [selectedTime, setSelectedTime] = React.useState(null);

    const [address, setAddress] = React.useState("");

    const [selectedWallpaper, setSelectedWallpaper] = React.useState(null);

    const [selectedFirstImage, setSelectedFirstImage] = React.useState(null);

    const [selectedSecondImage, setSelectedSecondImage] = React.useState(null);

    const [selectedThirdImage, setSelectedThirdImage] = React.useState(null);

    const [selectedFourthImage, setSelectedFourthImage] = React.useState(null);

    const [selectableTypes, setSelectableTypes] = React.useState([]);

    const [loading, setLoading] = React.useState(true);

    const [events, setEvents] = React.useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    const getEventData = async () => {
        const eventId = searchParams.get(EVENT_ID_PARAM);

        getTo(`${process.env.REACT_APP_BACKEND_HOST}${EVENT_URL}?${EVENT_ID_PARAM}=${eventId}`)
            .then(response => {
                if (response.error) {
                    SweetAlert2.fire({
                        title: GET_EVENT_ERROR,
                        icon: "error"
                    }).then();

                    setLoading(false);

                    return;
                }

                setName(response.name);

                setRichDescription(response.description);

                setCapacity(response.capacity);

                setTypes(response.types);

                setSelectedDate(response.date);

                setSelectedTime(response.time);

                setAddress(response.address);

                setEvents(response.agenda);

                if (response.pictures.length > 0) {
                    setSelectedWallpaper(response.pictures[0]);
                }

                if (response.pictures.length > 1) {
                    setSelectedFirstImage(response.pictures[1]);
                }

                if (response.pictures.length > 2) {
                    setSelectedSecondImage(response.pictures[2]);
                }

                if (response.pictures.length > 3) {
                    setSelectedThirdImage(response.pictures[3]);
                }

                if (response.pictures.length > 4) {
                    setSelectedFourthImage(response.pictures[4]);
                }

                setLoading(false);
            });
    }

    React.useEffect(() => {
        getTo(`${process.env.REACT_APP_BACKEND_HOST}${EVENT_TYPES_URL}`)
            .then(res => {
                if (res.error !== undefined) {
                    SweetAlert2.fire({
                        title: res.error,
                        icon: "error"
                    }).then();
                } else {
                    setSelectableTypes(res.event_types);
                }
            })
            .then(getEventData);
    }, []);

    return (
        <main style={{backgroundColor: "#eeeeee", minHeight: "100vh"}}>
            <Box style={createEventStyles.formContainer}>
                <Typography component="h1"
                            style={createEventStyles.title}>Foto de Portada
                </Typography>

                <UploadAndDisplayImage size="100%"
                                       height="400px"
                                       setSelectedImage={setSelectedWallpaper}/>

                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="stretch"
                    sx={{mt: 2}}
                    spacing={2}>
                    <Grid item mt={2}>
                        <TextField
                            style={{background: "white"}}
                            required
                            fullWidth
                            value={name}/>

                        <BlankLine/>

                        {loading ? (
                            <p></p>
                        ) : (
                            <InputTags selectableTypes={selectableTypes}
                                       selectedTypes={types}>
                            </InputTags>
                        )}

                        <BlankLine/>

                        <TextField
                            style={{background: "white"}}
                            required
                            fullWidth
                            value={address}/>

                        <BlankLine/>

                        <Typography style={createEventStyles.subtitle}>Acerca del evento
                        </Typography>

                        <div>{ReactHtmlParser(richDescription)}
                        </div>
                    </Grid>

                    <Grid item md={2}>
                        <Grid container direction="column" spacing={4}>
                            <Grid item sx={{mt: 2}}>
                                <TextField
                                    required
                                    fullWidth
                                    inputProps={{type: "number", min: 0, step: 1, pattern: "[0-9]*"}}
                                    id="quantity"
                                    label="Cantidad de entradas"
                                    name="quantity"
                                />
                            </Grid>
                        </Grid>

                        <BlankLine/>

                        <TextField
                            style={{background: "white"}}
                            required
                            fullWidth
                            value={selectedDate}/>

                        <BlankLine/>

                        <TextField
                            style={{background: "white"}}
                            required
                            fullWidth
                            value={selectedTime}/>
                    </Grid>

                    <BlankLine/>
                </Grid>

                <BlankLine number={2}/>

                <Typography component="h2"
                            style={createEventStyles.subTitle}>Galería
                </Typography>

                <BlankLine/>

                <Grid item md={10}>
                    <Grid container direction="row" spacing={2}>
                        <Box style={createEventStyles.galleryContainer}>

                            <Grid item sx={{px: 2}}>
                                <UploadAndDisplayImage
                                    size="300px"
                                    height="300px"
                                    setSelectedImage={setSelectedFirstImage}
                                />
                            </Grid>

                            <Grid item sx={{px: 2}}>
                                <UploadAndDisplayImage
                                    size="300px"
                                    height="300px"
                                    setSelectedImage={setSelectedSecondImage}
                                />
                            </Grid>

                            <Grid item sx={{px: 2}}>
                                <UploadAndDisplayImage
                                    size="300px"
                                    height="300px"
                                    setSelectedImage={setSelectedThirdImage}
                                />
                            </Grid>

                            <Grid item sx={{px: 2}}>
                                <UploadAndDisplayImage
                                    size="300px"
                                    height="300px"
                                    setSelectedImage={setSelectedFourthImage}
                                />
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>

                <BlankLine number={2}/>

                <FullCalendar
                    plugins={[timeGridPlugin, interactionPlugin]}
                    editable={false}
                    selectable={false}
                    initialView='timeGridDay'
                    dayHeaderContent={() => ''}
                    slotLabelInterval={{minutes: 30}}
                    contentHeight="1000px"
                    events={events}
                    allDaySlot={false}
                    headerToolbar={false}
                    eventResizableFromStart={true}
                />
            </Box>
        </main>
    );
}

export {
    ViewEventView
};
