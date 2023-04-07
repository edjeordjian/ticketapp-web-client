import * as React from "react";
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

import {CREATED_EVENT_LBL, UPLOAD_IMAGE_ERR_LBL} from "../constants/EventConstants";
import {useNavigate} from "react-router-dom";
import {uploadFile} from "../services/helpers/CloudStorageService";

import {basicButtonStyle} from "../styles/events/BasicButtonStyle";
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useMainContext} from "../services/contexts/MainContext";


export default function CreateEventView() {
    const [name, setName] = React.useState("");

    const [richDescription, setRichDescription] = React.useState("");

    const [capacity, setCapacity] = React.useState("");

    const [types, setTypes] = React.useState([]);

    const [selectableTypes, setSelectableTypes] = React.useState([]);

    const [loading, setLoading] = React.useState(true);

    const [selectedDate, setSelectedDate] = React.useState(null);

    const [selectedTime, setSelectedTime] = React.useState(null);

    const [address, setAddress] = React.useState("");

    const [selectedWallpaper, setSelectedWallpaper] = React.useState(null);

    const [selectedFirstImage, setSelectedFirstImage] = React.useState(null);

    const [selectedSecondImage, setSelectedSecondImage] = React.useState(null);

    const [selectedThirdImage, setSelectedThirdImage] = React.useState(null);

    const [selectedFourthImage, setSelectedFourthImage] = React.useState(null);

    const [isLoading, setIsLoading] = React.useState(false);

    const [events, setEvents] = React.useState([]);

    const [open, setOpen] = React.useState(false);

    const [newEventTitle, setNewEventTitle] = React.useState('');

    const [newEventStart, setNewEventStart] = React.useState(null);

    const [newEventEnd, setNewEventEnd] = React.useState(null);

    const {getUserData} = useMainContext();

    const navigate = useNavigate();

    const handleDateSelect = (selectInfo) => {
        setOpen(true);
        setNewEventStart(selectInfo.startStr);
        setNewEventEnd(selectInfo.endStr);
    };

    const handleDialogClose = () => {
        setOpen(false);
        setNewEventTitle('');
        setNewEventStart(null);
        setNewEventEnd(null);
    };

    const handleAddEvent = () => {
        if (events.filter((event) => event.title === newEventTitle).length !== 0) {
            SweetAlert2.fire({
                title: "Ya existe un panel con ese nombre.",
                icon: "error"
            }).then();

            handleDialogClose();

            return;
        }

        setEvents(prevEvents => [
            ...prevEvents,
            {
                title: newEventTitle,
                start: newEventStart,
                end: newEventEnd,
            },
        ]);

        handleDialogClose();
    };

    const handleEventClick = (clickInfo) => {
        SweetAlert2.fire({
            title: '¿Desea borrar el panel?',
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: 'Sí',
            denyButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                const newEvents = events.filter((event) => event.title !== clickInfo.event.title);
                setEvents(newEvents);
            }
        })
    }

    const handleEventDrop = (eventDropInfo) => {
        const {event, delta} = eventDropInfo;

        const index = events.findIndex((e) => e.title === event.title);

        const updatedEvent = {
            ...event,
            title: event.title,
            start: event.start.toISOString(),
            end: event.end.toISOString()
        };

        const newEvents = [...events];

        newEvents[index] = updatedEvent;

        setEvents(newEvents);
    };

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const typeIds = getKeys(types, selectableTypes);

        let wallpaper, image1, image2, image3, image4;

        const pictures = [];

        try {
            setIsLoading(true);

            if (selectedWallpaper) {
                wallpaper = await uploadFile(selectedWallpaper, selectedWallpaper.name);

                pictures.push(wallpaper);
            }

            if (selectedFirstImage) {
                image1 = await uploadFile(selectedFirstImage, selectedFirstImage.name)

                pictures.push(image1);
            }

            if (selectedSecondImage) {
                image2 = await uploadFile(selectedSecondImage, selectedSecondImage.name);

                pictures.push(image2);
            }

            if (selectedThirdImage) {
                image3 = await uploadFile(selectedThirdImage, selectedThirdImage.name);

                pictures.push(image3);
            }

            if (selectedFourthImage) {
                image4 = await uploadFile(selectedFourthImage, selectedFourthImage.name);

                pictures.push(image4);
            }
        } catch (err) {
            console.log(JSON.stringify(err));

            setIsLoading(false);

            SweetAlert2.fire({
                icon: 'info',
                title: UPLOAD_IMAGE_ERR_LBL
            }).then();
        }

        const userData = getUserData();

        const eventPayload = {
            ownerId: userData.id,

            name: name,

            description: richDescription,

            capacity: capacity,

            types: typeIds,

            address: address,

            date: selectedDate !== null  ? selectedDate.format('YYYY-MM-DD') : "",

            time: selectedTime !== null ? selectedTime.format("HH:mm") : "",

            pictures: pictures,

            agenda: events
        };

        postTo(`${process.env.REACT_APP_BACKEND_HOST}${EVENT_URL}`,
            eventPayload)
            .then(res => {

                setIsLoading(false);

                if (res.error) {
                    SweetAlert2.fire({
                        icon: 'error',
                        title: res.error
                    }).then();
                } else {
                    SweetAlert2.fire({
                        icon: 'info',
                        title: CREATED_EVENT_LBL
                    }).then(res => {
                        navigate(EVENTS_PATH);
                    });
                }
            });
    };

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

                setLoading(false);
            })
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
                            id="name"
                            label="Nombre"
                            name="name"
                            onChange={handleNameChange}/>

                        <BlankLine/>

                        {loading ? (
                            <p></p>
                        ) : (
                            <InputTags onTypesChange={handleTypesChange}
                                       selectableTypes={selectableTypes}
                                       selectedTypes={[]}>
                            </InputTags>
                        )}

                        <BlankLine/>

                        <TextField
                            style={{background: "white"}}
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
                            <Grid item sx={{mt: 2}}>
                                <TextField
                                    required
                                    fullWidth
                                    inputProps={{type: "number", min: 0, step: 1, pattern: "[0-9]*"}}
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

                <TextField
                    style={{background: "white"}}
                    required
                    fullWidth
                    label="Agenda"/>

                <FullCalendar
                    plugins={[timeGridPlugin, interactionPlugin]}
                    editable={true}
                    selectable={true}
                    initialView='timeGridDay'
                    dayHeaderContent={() => ''}
                    slotLabelInterval={{minutes: 30}}
                    contentHeight="1000px"
                    allDaySlot={false}
                    headerToolbar={false}
                    events={events}
                    select={handleDateSelect}
                    eventClick={handleEventClick}
                    eventDrop={handleEventDrop}
                    eventResizableFromStart={true}
                />

                <Dialog open={open} onClose={handleDialogClose}>
                    <DialogTitle>Agregar panel
                    </DialogTitle>

                    <DialogContent>
                        <TextField autoFocus
                                   margin="dense"
                                   label="Nombre"
                                   fullWidth
                                   value={newEventTitle}
                                   onChange={e => setNewEventTitle(e.target.value)}/>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleDialogClose}
                                color="primary">Cancelar
                        </Button>

                        <Button onClick={handleAddEvent}
                                color="primary">Agregar
                        </Button>
                    </DialogActions>
                </Dialog>

                <BlankLine number={2}/>

                <Button
                    type={"button"}
                    variant="contained"
                    onClick={handleSubmit}
                    style={basicButtonStyle}
                    loading={isLoading.toString()}
                    disabled={isLoading}>
                    <Typography>{isLoading ? 'Cargando...' : 'Crear evento'}</Typography>
                </Button>
            </Box>
        </main>
    );
}
