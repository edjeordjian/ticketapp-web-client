import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { getTo, postTo } from "../services/helpers/RequestHelper";
import { Box } from "@mui/system";
import * as React from "react";
import BasicBtn from "../components/BasicBtn";
import { useNavigate } from "react-router-dom";
import {
  ADD_TO_GROUP_PATH,
  EVENT_CREATE_PATH,
  EVENT_ID_PARAM,
  EVENT_SEARCH_NAME_URL,
  EVENT_VIEW_PATH,
  EVENT_EDIT_PATH,
  OWNER_PARAM,
  CANCEL_EVENT,
  EVENTS_PATH,
} from "../constants/URLs";
import {
  DRAFT_STATUS_LBL,
  CANCELLED_STATUS_LBL,
  SUSPENDED_STATUS_LBL,
  FINISHED_STATUS_LBL,
  PUBLISHED_STATUS_LBL,
  EVENT_DELETED,
} from "../constants/EventConstants";
import * as SweetAlert2 from "sweetalert2";
import { useMainContext } from "../services/contexts/MainContext";
import { BlankLine } from "../components/BlankLine";

const styles = {
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: "15px",
  },
  eventsContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "25px",
  },
  btnContainer: {
    width: "100%",
    marginBottom: "15px",
    flex: "1",
  },
  textOverPublished: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#A5C91B",
    borderRadius: "25px",
    padding: "10px 70px",
    color: "white",
    border: "none",
    fontSize: "16px",
    textTransform: "uppercase",
  },
  textOverDraft: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "grey",
    borderRadius: "25px",
    padding: "10px 70px",
    color: "white",
    border: "none",
    fontSize: "16px",
    marginRight: "15px",
    textTransform: "uppercase",
  },
  textOverCancelled: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#FF5F5F",
    borderRadius: "25px",
    padding: "10px 70px",
    color: "white",
    border: "none",
    fontSize: "16px",
    textTransform: "uppercase",
  },
  textOverSuspended: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#f5e25f",
    borderRadius: "25px",
    padding: "10px 70px",
    color: "#444",
    border: "none",
    fontSize: "16px",
    textTransform: "uppercase",
  },
  textOverFinalized: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#444",
    borderRadius: "25px",
    padding: "10px 70px",
    color: "white",
    border: "none",
    fontSize: "16px",
    textTransform: "uppercase",
  },
  deleteButton: {
    position: "absolute",
    right: 0,
    bottom: 300,
    zIndex: 200,
  },
};

export default function EventsListView(props) {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(true);
  const [selectableEvents, setSelectableEvents] = React.useState([]);
  const { getUserId, getUserToken } = useMainContext();
  const [userId, setUserId] = React.useState(getUserId());

  const [userToken, setUserToken] = React.useState(getUserToken());

  React.useEffect(() => {
    getTo(
      `${process.env.REACT_APP_BACKEND_HOST}${EVENT_SEARCH_NAME_URL}?${OWNER_PARAM}=${userId}`,
      userToken
    ).then((res) => {
      if (res.error !== undefined) {
        SweetAlert2.fire({
          title: res.error,
          icon: "error",
        }).then();
      } else {
        setSelectableEvents(res.events);
      }
      setLoading(false);
    });
  }, []);

  const displayProject = (source) => {
    if (
      source.state.name === FINISHED_STATUS_LBL ||
      source.state.name === CANCELLED_STATUS_LBL ||
      source.state.name === SUSPENDED_STATUS_LBL
    ) {
      return (
        <div>
          <Typography variant="h3" display="block">
            {source.name}
          </Typography>
          <a
            onClick={() =>
              navigate(`${EVENT_VIEW_PATH}?${EVENT_ID_PARAM}=${source.id}`)
            }
            key={source.id}
          >
            <div
              style={{ width: "100%", height: "400px", position: "relative" }}
            >
              <img
                alt="Sin imagen"
                width={"100%"}
                height={"400px"}
                style={{ borderRadius: 20, marginTop: "25px", zIndex: 1 }}
                src={source.pictures ? source.pictures[0] : ""}
              />
              {source.state.name === FINISHED_STATUS_LBL && (
                <h1 style={styles.textOverFinalized}>{source.state.name}</h1>
              )}
              {source.state.name === CANCELLED_STATUS_LBL && (
                <h1 style={styles.textOverCancelled}>{source.state.name}</h1>
              )}
              {source.state.name === SUSPENDED_STATUS_LBL && (
                <h1 style={styles.textOverSuspended}>{source.state.name}</h1>
              )}
            </div>

            <BlankLine number={2} />
          </a>
        </div>
      );
    }

    const handleSubmit = async (event, id) => {
      event.preventDefault();

      const payload = {
        eventId: id
      };
      SweetAlert2.fire({
        title: 'Está por borrar un evento',
        text: "Una vez borrado, no podrá recuperse el evento. ¿Desea borrar el evento?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
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
                title: EVENT_DELETED,
              }).then((_res) => {
                navigate(EVENTS_PATH);
                window.location.reload(false);
              });
            }
          });
        }
      })
    };

    return (
      <div>
        <Typography variant="h3" display="block">
          {source.name}
        </Typography>

        <div style={{ width: "100%", height: "400px", position: "relative" }}>
          <a
            onClick={() =>
              navigate(`${EVENT_EDIT_PATH}?${EVENT_ID_PARAM}=${source.id}`)
            }
            key={source.id}
          >
            <img
              alt="Sin imagen"
              width={"100%"}
              height={"400px"}
              style={{ borderRadius: 20, marginTop: "25px", zIndex: 1 }}
              src={source.pictures ? source.pictures[0] : ""}
            />
          </a>
          {source.state.name === DRAFT_STATUS_LBL && (
            <h1 style={styles.textOverDraft}>{source.state.name}</h1>
          )}
          {source.state.name === DRAFT_STATUS_LBL && (
            <div style={styles.deleteButton}>
              <IconButton
                color="error"
                aria-label="upload picture"
                component="label"
                size="large"
                onClick={(event) => handleSubmit(event, source.id)}
              >
                <DeleteIcon fontSize="inherit" size="large" />
              </IconButton>
            </div>
          )}
          {source.state.name === PUBLISHED_STATUS_LBL && (
            <h1 style={styles.textOverPublished}>{source.state.name}</h1>
          )}
        </div>

        <BlankLine number={2} />
      </div>
    );
  };

  const onCreateEventClicked = (_) => {
    navigate(EVENT_CREATE_PATH);
  };

  const navigateToAddGroupMemberScreen = () => {
    navigate(ADD_TO_GROUP_PATH);
  };
  return (
    <>
      <Box style={{ marginLeft: "250px", padding: "25px" }}>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <BasicBtn label={"Crear evento"} onClick={onCreateEventClicked} />

          <BasicBtn
            label={"Miembros de staff"}
            onClick={navigateToAddGroupMemberScreen}
          />
        </div>

        <BlankLine />

        <BlankLine />

        {loading ? (
          <p></p>
        ) : (
          <Box styles={styles.eventsContainer}>
            {selectableEvents.map((event) => {
              return displayProject(event);
            })}
          </Box>
        )}
      </Box>
    </>
  );
}
