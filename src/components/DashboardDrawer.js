import React from "react";
import {Divider, Drawer, List, ListItem, ListItemText, Toolbar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {EVENTS_PATH} from "../constants/URLs";
import {useMainContext} from "../services/contexts/MainContext";


export default function DashboardDrawer() {
    const text = "Eventos";

    const [optionSelected, setOptionSelected] = React.useState(true);

    const navigate = useNavigate();

    const {logOut} = useMainContext();

    const handleLogOut = () => {
        logOut();

        navigate("/");
    }

    return (
        <Drawer
            sx={{
                width: 200,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 200,
                    boxSizing: 'border-box',
                    zIndex: 1
                },
            }}
            variant="permanent"
            anchor="left"
            className="office-dashboard-drawer">
            <Toolbar/>
            <Divider/>
            <List>
                <ListItem button key={text}
                          style={{color: optionSelected ? "#6B7DE5" : "#252733"}}
                          className="dashboard-item">
                    <ListItemText primary={"Eventos"} onClick={() => navigate(EVENTS_PATH)}/>
                </ListItem>

                <ListItem button key={text}
                          style={{color: optionSelected ? "#6B7DE5" : "#252733"}}
                          className="dashboard-item">
                    <ListItemText primary={"Salir"} onClick={() => handleLogOut()}/>
                </ListItem>
            </List>
            <Divider/>
        </Drawer>
    );
}
