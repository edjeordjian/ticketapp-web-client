import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UploadAndDisplayImage from "../components/UploadAndDisplayImage";
import BasicDatePicker from "../components/BasicDatePicker";
import InputTags from "../components/TagField";
import { getTo, patchTo, postTo } from "../services/helpers/RequestHelper";
import {
  EVENT_TYPES_URL,
  EVENT_URL,
  EVENTS_PATH,
  EVENT_ID_PARAM, CANCEL_EVENT
} from "../constants/URLs";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  turnDateStringToToday,
  turnDateToMomentFormat,
} from "../services/helpers/DateService";
import { BlankLine } from "../components/BlankLine";
import "react-quill/dist/quill.snow.css";
import { getKeys } from "../services/helpers/JsonHelpers";
import BasicTimePicker from "../components/BasicTimePicker";
import ReactQuill from "react-quill";
import { createEventStyle as createEventStyles } from "../styles/events/CreateEventStyle";
import SweetAlert2 from "sweetalert2";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  CREATED_EVENT_LBL,
  IMAGE_TOO_SMALL_ERR_LBL,
  UPLOAD_IMAGE_ERR_LBL,
  PUBLISHED_STATUS_LBL,
  DRAFT_STATUS_LBL,
  GET_EVENT_ERROR,
  UPDATED_EVENT_LBL, EVENT_DELETED
} from "../constants/EventConstants";
import { useNavigate, useSearchParams } from "react-router-dom";
import { uploadFile } from "../services/helpers/CloudStorageService";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useMainContext } from "../services/contexts/MainContext";
import BasicBtn from "../components/BasicBtn";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import moment from "moment";
import dayjs from "dayjs";

export default function EditEventView() {
  const [name, setName] = React.useState("");

  const [images, setImages] = React.useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const [organizerName, setOrganizerName] = React.useState("");

  const { getUserId, getUserData, getUserToken } = useMainContext();

  const [richDescription, setRichDescription] = React.useState("");

  const [capacity, setCapacity] = React.useState("");

  const [types, setTypes] = React.useState([]);

  const [selectableTypes, setSelectableTypes] = React.useState([]);

  const [loading, setLoading] = React.useState(true);

  const [selectedDate, setSelectedDate] = React.useState(null);

  const [selectedTime, setSelectedTime] = React.useState(null);

  const [address, setAddress] = React.useState("");

  const [questions, setQuestions] = React.useState([]);

  const [selectedWallpaper, setSelectedWallpaper] = React.useState(null);

  const [selectedFirstImage, setSelectedFirstImage] = React.useState(null);

  const [selectedSecondImage, setSelectedSecondImage] = React.useState(null);

  const [selectedThirdImage, setSelectedThirdImage] = React.useState(null);

  const [selectedFourthImage, setSelectedFourthImage] = React.useState(null);

  const [isLoading, setIsLoading] = React.useState(false);

  const [didGet, setDidGet] = React.useState(false);

  const [events, setEvents] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const [newEventTitle, setNewEventTitle] = React.useState("");

  const [newEventStart, setNewEventStart] = React.useState(null);

  const [newEventEnd, setNewEventEnd] = React.useState(null);

  const [userToken, setUserToken] = React.useState(getUserToken());

  const [latitude, setLatitude] = React.useState(0);

  const [longitude, setLongitude] = React.useState(0);

  const [center, setCenter] = React.useState(null);

  const [status, setStatus] = React.useState(null);

  const [sendNotification, setSendNotification] = React.useState(false);

  const navigate = useNavigate();

  const handleDateSelect = (selectInfo) => {
    setOpen(true);
    setNewEventStart(selectInfo.startStr);
    setNewEventEnd(selectInfo.endStr);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setNewEventTitle("");
    setNewEventStart(null);
    setNewEventEnd(null);
  };

  const handleAddEvent = () => {
    if (events.filter((event) => event.title === newEventTitle).length !== 0) {
      SweetAlert2.fire({
        title: "Ya existe un panel con ese nombre.",
        icon: "error",
      }).then();

      handleDialogClose();

      return;
    }

    setEvents((prevEvents) => [
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
      title: "¿Desea borrar el panel?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const newEvents = events.filter(
          (event) => event.title !== clickInfo.event.title
        );
        setEvents(newEvents);
      }
    });
  };

  const handleEventDrop = (eventDropInfo) => {
    const { event, delta } = eventDropInfo;
    const index = events.findIndex((e) => e.title === event.title);
    const updatedEvent = {
      title: event.title,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
    };
    const newEvents = [...events];
    newEvents[index] = updatedEvent;
    setEvents(newEvents);
  };

  const handleEventResize = (eventResizeInfo) => {
    const { event } = eventResizeInfo;
    const index = events.findIndex((e) => e.title === event.title);
    const updatedEvent = {
      title: event.title,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
    };
    const newEvents = [...events];
    newEvents[index] = updatedEvent;
    setEvents(newEvents);
  };

  const handleNameChange = (event) => {
    setSendNotification(true);

    setName(event.target.value);
  };

  const handleRichDescriptionChange = (html) => {
    setRichDescription(html);
  };

  const handleCapacityChange = (event) => {
    setCapacity(event.target.value);
  };

  const handleTypesChange = (value) => {
    setTypes(value);
  };

  const handleSelectedDate = (value) => {
    setSendNotification(true);

    setSelectedDate(value);
  };

  const handleSelectedTime = (value) => {
    setSendNotification(true);

    setSelectedTime(value);
  };

  const onPlaceChanged = (placeSelected) => {
    setSendNotification(true);

    setAddress(placeSelected.label);

    geocodeByPlaceId(placeSelected.value.place_id).then((results) => {
      setLatitude(results[0].geometry.location.lat());
      setLongitude(results[0].geometry.location.lng());
    });
  };

  const handleAddQuestion = () => {
    if (questionField.value && answerField.value) {
      setQuestions([
        ...questions,
        { question: questionField.value, answer: answerField.value },
      ]);
      questionField.value = "";
      answerField.value = "";
      setSendNotification(true);
    } else {
      SweetAlert2.fire({
        title: "Es necesario completar pregunta y respuesta",
        icon: "error",
      }).then();

      handleDialogClose();
    }
  };

  const handleRemoveQuestion = async (index) => {
    questions.splice(index, 1);
    setQuestions([...questions]);
    setSendNotification(true);
  };

  const updateEvent = (eventPayload) => {
    patchTo(
      `${process.env.REACT_APP_BACKEND_HOST}${EVENT_URL}`,
      eventPayload,
      userToken
    ).then((res) => {
      setIsLoading(false);

      if (res.error) {
        SweetAlert2.fire({
          icon: "error",
          title: res.error,
        }).then();
      } else {
        SweetAlert2.fire({
          icon: "info",
          title: UPDATED_EVENT_LBL,
        }).then((res) => {
          navigate(EVENTS_PATH);
        });
      }
    });
  };

  const handleSubmit = async (event, status, publication = false) => {
    event.preventDefault();
    const typeIds = getKeys(types, selectableTypes);
    let wallpaper, image1, image2, image3, image4;
    const pictures = [];
    try {
      setIsLoading(true);
      if (selectedWallpaper) {
        wallpaper = await uploadFile(selectedWallpaper, selectedWallpaper.name);
        if (!wallpaper) {
          return SweetAlert2.fire({
            title: IMAGE_TOO_SMALL_ERR_LBL,
            icon: "error",
          }).then();
        }
        pictures.push(wallpaper);
      }

      if (selectedFirstImage) {
        image1 = await uploadFile(selectedFirstImage, selectedFirstImage.name);
        if (!image1) {
          return SweetAlert2.fire({
            title: IMAGE_TOO_SMALL_ERR_LBL,
            icon: "error",
          }).then();
        }
        pictures.push(image1);
      }

      if (selectedSecondImage) {
        image2 = await uploadFile(
          selectedSecondImage,
          selectedSecondImage.name
        );
        if (!image2) {
          return SweetAlert2.fire({
            title: IMAGE_TOO_SMALL_ERR_LBL,
            icon: "error",
          }).then();
        }
        pictures.push(image2);
      }

      if (selectedThirdImage) {
        image3 = await uploadFile(selectedThirdImage, selectedThirdImage.name);
        if (!image3) {
          return SweetAlert2.fire({
            title: IMAGE_TOO_SMALL_ERR_LBL,
            icon: "error",
          }).then();
        }
        pictures.push(image3);
      }

      if (selectedFourthImage) {
        image4 = await uploadFile(
          selectedFourthImage,
          selectedFourthImage.name
        );

        if (!image4) {
          return SweetAlert2.fire({
            title: IMAGE_TOO_SMALL_ERR_LBL,
            icon: "error",
          }).then();
        }

        pictures.push(image4);
      }
    } catch (err) {
      console.log(JSON.stringify(err));

      setIsLoading(false);

      SweetAlert2.fire({
        icon: "info",
        title: UPLOAD_IMAGE_ERR_LBL,
      }).then();
    }

    const userData = getUserData();

    const notify = sendNotification && status === PUBLISHED_STATUS_LBL;

    const eventPayload = {
      id: searchParams.get(EVENT_ID_PARAM),
      ownerId: userData.id,
      name: name,
      description: richDescription,
      capacity: capacity,
      types: typeIds,
      address: address,
      latitude: latitude,
      longitude: longitude,
      date: selectedDate !== null ? selectedDate.format("YYYY-MM-DD") : "",
      time: selectedTime !== null ? selectedTime.format("HH:mm") : "",
      pictures: pictures,
      agenda: events,
      faq: questions.map((x) => [x.question, x.answer]),
      status: status,
      sendNotification: notify
    };

    if (notify) {
      SweetAlert2.fire({
        title: 'Se notificará a los usuarios inscriptos',
        text: "Si se guardan los cambios realizados, se le avisará a los asistentes de los cambios en el evento.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          updateEvent(eventPayload);
        } else {
          setIsLoading(false);
        }
      })
    } else {
      updateEvent(eventPayload);
    }
  };

  const getEventData = async () => {
    const eventId = searchParams.get(EVENT_ID_PARAM);
    getTo(
      `${process.env.REACT_APP_BACKEND_HOST}${EVENT_URL}?${EVENT_ID_PARAM}=${eventId}`,
      userToken
    ).then((response) => {
      if (response.error) {
        SweetAlert2.fire({
          title: GET_EVENT_ERROR,
          icon: "error",
        }).then();
        setLoading(false);
        return;
      }

      setName(response.name);
      setRichDescription(response.description);
      setCapacity(response.capacity);
      setTypes(response.types_names);
      setSelectedDate(moment(turnDateToMomentFormat(response.date)));
      setSelectedTime(dayjs(response.time, `H:mm`));
      setAddress(response.address);
      setOrganizerName(response.organizerName);
      setQuestions(response.faq);
      setLatitude(response.latitude);
      setLongitude(response.longitude);
      setStatus(response.state.name);
      const mappedSpaces = response.agenda.map((space) => {
        return {
          title: space.title,
          start: turnDateStringToToday(space.start),
          end: turnDateStringToToday(space.end, true),
        };
      });

      setEvents(mappedSpaces);
      const definedImages = [];
      if (response.pictures.length > 0) {
        definedImages.push(response.pictures[0]);
      }
      if (response.pictures.length > 1) {
        definedImages.push(response.pictures[1]);
      }
      if (response.pictures.length > 2) {
        definedImages.push(response.pictures[2]);
      }
      if (response.pictures.length > 3) {
        definedImages.push(response.pictures[3]);
      }
      if (response.pictures.length > 4) {
        definedImages.push(response.pictures[4]);
      }
      setImages(definedImages);

      setLoading(false);

      setDidGet(true);
    });
  };

  const cancelEvent = (message) => {
    const payload = {
      eventId: searchParams.get(EVENT_ID_PARAM)
    };

    postTo(
      `${process.env.REACT_APP_BACKEND_HOST}${CANCEL_EVENT}`,
      payload,
      userToken
    ).then((res) => {
      if (res.error) {
        SweetAlert2.fire({
          icon: "error",
          title: res.error,
        }).then();
      } else {
        SweetAlert2.fire({
          icon: "info",
          title: message,
        }).then((_res) => {
          navigate(EVENTS_PATH);
          window.location.reload(false);
        });
      }
    });
  }

  const handleCancel = async () => {
    if (status === PUBLISHED_STATUS_LBL) {
      SweetAlert2.fire({
        title: 'Se notificará a los usuarios inscriptos',
        text: `Si se cancela el evento, se le avisará a los asistentes.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          cancelEvent("Cancelado");
        }
      });
    } else {
      SweetAlert2.fire({
        title: 'Está por borrar un evento.',
        text: `Esta acción es definitiva.¿Desea continuar?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          cancelEvent("Cancelado");
        }
      });
    }
  }

  React.useEffect(() => {
    if (latitude && longitude) {
      setCenter({
        lat: Number(latitude),
        lng: Number(longitude),
      });
    }
  }, [latitude, longitude]);

  React.useEffect(() => {
    getTo(`${process.env.REACT_APP_BACKEND_HOST}${EVENT_TYPES_URL}`, userToken)
      .then((res) => {
        if (res.error !== undefined) {
          SweetAlert2.fire({
            title: res.error,
            icon: "error",
          }).then();
        } else {
          setSelectableTypes(res.event_types);
        }
      })
      .then(getEventData);
  }, []);

  return (
    <main style={{ backgroundColor: "#eeeeee", minHeight: "100vh" }}>
      <Box style={createEventStyles.formContainer}>
        <Typography component="h1" style={createEventStyles.title}>
          Foto de Portada
        </Typography>
        <UploadAndDisplayImage
          size="100%"
          height="400px"
          setSelectedImage={setSelectedWallpaper}
          oldImage={images[0]}
          isEditing={true}
        />
        <Typography variant="caption" display="block" gutterBottom>
          Resolucion recomendada 1920x1080. Tamaño requerido 1MB mínimo, 10MB
          máximo
        </Typography>
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
              value={name}
              onChange={handleNameChange}
            />

            <BlankLine />

            {loading ? (
              <p></p>
            ) : (
              <InputTags
                onTypesChange={handleTypesChange}
                selectableTypes={selectableTypes}
                selectedTypes={types}
              >
                {" "}
              </InputTags>
            )}

            <BlankLine />

            {address ? (
              <GooglePlacesAutocomplete
                selectProps={{
                  placeholder: address,
                  onChange: onPlaceChanged,
                }}
                autocompletionRequest={{
                  componentRestrictions: {
                    country: ["ar"],
                  },
                }}
              />
            ) : (
              <></>
            )}

            <BlankLine />

            {center ? (
              <GoogleMap
                mapContainerStyle={{
                  width: "800px",
                  height: "400px",
                }}
                center={center}
                zoom={17}
              >
                {latitude ? <MarkerF position={center} /> : <></>}
              </GoogleMap>
            ) : (
              <></>
            )}

            <BlankLine />

            <Typography style={createEventStyles.subtitle}>
              Acerca del evento
            </Typography>

            <ReactQuill
              value={richDescription}
              theme="snow"
              onChange={handleRichDescriptionChange}
              style={{
                height: "300px",
                width: "800px",
              }}
            />
          </Grid>

          <Grid item md={2}>
            <Grid container direction="column" spacing={4}>
              <Grid item sx={{ mt: 2 }}>
                <TextField
                  required
                  fullWidth
                  inputProps={{
                    type: "number",
                    min: 0,
                    step: 1,
                    pattern: "[0-9]*",
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  id="quantity"
                  label="Cantidad de entradas"
                  name="quantity"
                  value={capacity}
                  onChange={handleCapacityChange}
                />
              </Grid>
            </Grid>

            <BlankLine />
            <BasicDatePicker
              setSelectedDate={handleSelectedDate}
              oldDate={selectedDate}
              didGet={didGet}
            />
            <BlankLine />
            <BasicTimePicker
              setSelectedTime={handleSelectedTime}
              oldTime={selectedTime}
              didGet={didGet}
            />
          </Grid>

          <BlankLine />
        </Grid>
        <BlankLine />
        <BlankLine />
        <BlankLine />
        <BlankLine />
        <Typography component="h2" style={createEventStyles.subTitle}>
          Galería
        </Typography>

        <BlankLine />
        <Grid container direction="row">
          <Typography component="h1" style={createEventStyles.title}>
            FAQ &nbsp;
          </Typography>
          <Typography
            component="h1"
            style={createEventStyles.title}
            sx={{ color: "text.secondary" }}
          >
            (Sumá las preguntas más frecuentes)
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item container direction="column" md={10}>
            <TextField
              sx={{ paddingBottom: 2 }}
              id="questionField"
              name="questionField"
              variant="outlined"
              placeholder="Pregunta"
            />
            <TextField
              sx={{ paddingBottom: 2 }}
              id="answerField"
              name="answerField"
              variant="outlined"
              placeholder="Respuesta"
            />
          </Grid>

          <IconButton
            type={"button"}
            variant="contained"
            onClick={handleAddQuestion}
            size="large"
          >
            <AddCircleOutlineIcon color="primary" fontSize="large" />
          </IconButton>
        </Grid>
        <Box>
          {questions.map((question, i) => (
            <Box key={question[0]}>
              {
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Grid
                    item
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    md={10}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      P: {question.question}
                    </Typography>
                    <Typography sx={{ fontStyle: "italic" }}>
                      R: {question.answer}
                    </Typography>
                  </Grid>
                  <IconButton
                    type={"button"}
                    variant="contained"
                    onClick={async () => handleRemoveQuestion(i)}
                    size="large"
                  >
                    <ClearIcon color="primary" fontSize="large" />
                  </IconButton>
                </Grid>
              }
            </Box>
          ))}
        </Box>

        <BlankLine />

        <Grid item md={10}>
          <Grid container direction="row" spacing={2}>
            <Box style={createEventStyles.galleryContainer}>
              <Grid item sx={{ px: 2 }}>
                <UploadAndDisplayImage
                  size="300px"
                  height="300px"
                  setSelectedImage={setSelectedFirstImage}
                  oldImage={images[1]}
                  isEditing={images.length > 0}
                />
              </Grid>

              <Grid item sx={{ px: 2 }}>
                <UploadAndDisplayImage
                  size="300px"
                  height="300px"
                  setSelectedImage={setSelectedSecondImage}
                  oldImage={images[2]}
                  isEditing={images.length > 2}
                />
              </Grid>

              <Grid item sx={{ px: 2 }}>
                <UploadAndDisplayImage
                  size="300px"
                  height="300px"
                  setSelectedImage={setSelectedThirdImage}
                  oldImage={images[3]}
                  isEditing={images.length > 3}
                />
              </Grid>

              <Grid item sx={{ px: 2 }}>
                <UploadAndDisplayImage
                  size="300px"
                  height="300px"
                  setSelectedImage={setSelectedFourthImage}
                  oldImage={images[4]}
                  isEditing={images.length > 4}
                />
              </Grid>
            </Box>
          </Grid>
        </Grid>

        <BlankLine number={2} />

        <Typography component="h2" style={createEventStyles.subTitle}>
          Agenda
        </Typography>

        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          editable={true}
          selectable={true}
          initialView="timeGridDay"
          dayHeaderContent={() => ""}
          slotLabelInterval={{ minutes: 30 }}
          contentHeight="1000px"
          allDaySlot={false}
          headerToolbar={false}
          events={events}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
          eventResizableFromStart={true}
        />

        <Dialog open={open} onClose={handleDialogClose}>
          <DialogTitle>Agregar panel</DialogTitle>

          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre"
              fullWidth
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancelar
            </Button>

            <Button onClick={handleAddEvent} color="primary">
              Agregar
            </Button>
          </DialogActions>
        </Dialog>

        <BlankLine number={2} />
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <BasicBtn
            type={"button"}
            variant="contained"
            onClick={(event) => handleSubmit(event, PUBLISHED_STATUS_LBL, status !== PUBLISHED_STATUS_LBL)}
            loading={isLoading.toString()}
            label={isLoading
              ? "Cargando..."
              : (status === PUBLISHED_STATUS_LBL ? "Guardar" : "Publicar")
            }
            disabled={isLoading}
            color="green"
          />

          {status === DRAFT_STATUS_LBL && (
            <BasicBtn
              type={"button"}
              variant="contained"
              onClick={(event) => handleSubmit(event, DRAFT_STATUS_LBL)}
              loading={isLoading.toString()}
              label={isLoading ? "Cargando..." : "Guardar borrador"}
              disabled={isLoading}
            />
          )}

          {(status === PUBLISHED_STATUS_LBL || status === DRAFT_STATUS_LBL) && (
            <BasicBtn
              type={"button"}
              variant="contained"
              onClick={(event) => handleCancel()}
              loading={isLoading.toString()}
              label={isLoading
                ? "Cargando..."
                : (status === PUBLISHED_STATUS_LBL
                  ? "Cancelar"
                  : "Borrar")}
              disabled={isLoading}
              color="red"
            />
          )}
        </Grid>
      </Box>
    </main>
  );
}
