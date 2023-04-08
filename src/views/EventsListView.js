import { Typography } from "@mui/material";
import { getTo, postTo } from "../services/helpers/RequestHelper";
import { Box } from "@mui/system";
import * as React from "react";
import BasicBtn from "../components/BasicBtn";
import DashboardDrawer from "../components/DashboardDrawer";
import { useNavigate } from "react-router-dom";
import { EVENT_CREATE_PATH } from "../constants/URLs";
import { EVENT_URL, EVENTS_PATH } from "../constants/URLs";

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
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "15px",
  },
};

function displayProject(source) {
  return (
    <a onClick={() => console.log("Nada por aquí todavía")}>
      <Typography variant="h3" display="block">
        {source.name}
      </Typography>
      <img
        alt="not found"
        width={"100%"}
        height={"400px"}
        style={{ borderRadius: 20, marginTop: "25px" }}
        src={source.pictures[0]}
      />
    </a>
  );
}

export default function EventsListView(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [selectableEvents, setSelectableEvents] = React.useState([]);
  React.useEffect(() => {
    getTo(`${process.env.REACT_APP_BACKEND_HOST}${EVENT_URL}/all`).then(
      (res) => {
        if (res.error !== undefined) {
          SweetAlert2.fire({
            title: res.error,
            icon: "error",
          }).then();
        } else {
          setSelectableEvents(res.events);
        }
        setLoading(false);
      }
    );
  }, []);

  const onCreateEventClicked = (_) => {
    navigate(EVENT_CREATE_PATH);
  };
  return (
    <>
      <Box style={{ marginLeft: "220px", padding: "25px" }}>
        <Box style={styles.btnContainer}>
          <BasicBtn label={"Crear evento"} onClick={onCreateEventClicked} />
        </Box>
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
