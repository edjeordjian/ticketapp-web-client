import { Typography } from "@mui/material";
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
} from "../constants/URLs";
import {
  DRAFT_STATUS_LBL,
  CANCELLED_STATUS_LBL,
  SUSPENDED_STATUS_LBL,
  FINISHED_STATUS_LBL,
  PUBLISHED_STATUS_LBL,
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
    position: "relative",
    top: -200,
    bottom: 0,
    left: 1320,
    backgroundColor: "green",
    borderRadius: "25px",
    padding: "10px 70px",
    color: "white",
    border: "none",
    fontSize: "16px",
    textTransform: "capitalize",
    display: "inline-block",
  },
  textOverDraft: {
    position: "relative",
    top: -200,
    bottom: 0,
    left: 1320,
    backgroundColor: "grey",
    borderRadius: "25px",
    padding: "10px 70px",
    color: "white",
    border: "none",
    fontSize: "16px",
    textTransform: "capitalize",
    display: "inline-block",
  },
  textOverCancelled: {
    position: "relative",
    top: -200,
    bottom: 0,
    left: 1320,
    backgroundColor: "red",
    borderRadius: "25px",
    padding: "10px 70px",
    color: "white",
    border: "none",
    fontSize: "16px",
    textTransform: "capitalize",
    display: "inline-block",
  },
  textOverSuspended: {
    position: "relative",
    top: -200,
    bottom: 0,
    left: 1320,
    backgroundColor: "yellow",
    borderRadius: "25px",
    padding: "10px 70px",
    color: "white",
    border: "none",
    fontSize: "16px",
    textTransform: "capitalize",
    display: "inline-block",
  },
  textOverFinalized: {
    position: "relative",
    top: -200,
    bottom: 0,
    left: 1320,
    backgroundColor: "yellow",
    borderRadius: "25px",
    padding: "10px 70px",
    color: "white",
    border: "none",
    fontSize: "16px",
    textTransform: "capitalize",
    display: "inline-block",
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
        <a
          onClick={() =>
            navigate(`${EVENT_VIEW_PATH}?${EVENT_ID_PARAM}=${source.id}`)
          }
          key={source.id}
        >
          <Typography variant="h3" display="block">
            {source.name}
          </Typography>
          <img
            alt="Sin imagen"
            width={"100%"}
            height={"400px"}
            style={{ borderRadius: 20, marginTop: "25px" }}
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
          <BlankLine />
        </a>
      );
    }
    return (
      <a
        onClick={() =>
          navigate(`${EVENT_EDIT_PATH}?${EVENT_ID_PARAM}=${source.id}`)
        }
        key={source.id}
      >
        <Typography variant="h3" display="block">
          {source.name}
        </Typography>
        <img
          alt="Sin imagen"
          width={"100%"}
          height={"400px"}
          style={{ borderRadius: 20, marginTop: "25px" }}
          src={source.pictures ? source.pictures[0] : ""}
        />
        {source.state.name === DRAFT_STATUS_LBL && (
          <h1 style={styles.textOverDraft}>{source.state.name}</h1>
        )}
        {source.state.name === PUBLISHED_STATUS_LBL && (
          <h1 style={styles.textOverPublished}>{source.state.name}</h1>
        )}
        <BlankLine />
      </a>
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
            alignItems: "center",
          }}
        >
          <Box style={styles.btnContainer}>
            <BasicBtn label={"Crear evento"} onClick={onCreateEventClicked} />
          </Box>

          <Box style={{ marginLeft: "auto" }}>
            <BasicBtn
              label={"Miembros de staff"}
              onClick={navigateToAddGroupMemberScreen}
            />
          </Box>
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
