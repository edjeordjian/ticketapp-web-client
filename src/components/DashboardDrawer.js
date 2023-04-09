import React from "react";
import {Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {EVENTS_PATH} from "../constants/URLs";
import {useMainContext} from "../services/contexts/MainContext";
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';



export default function DashboardDrawer() {
    const [optionSelected, setOptionSelected] = React.useState(true);

    const navigate = useNavigate();

    const {logOut} = useMainContext();

    const handleLogOut = () => {
        logOut();

        navigate("/");
    }

    const urlImage = "https://www.gannett-cdn.com/presto/2022/09/13/PDTN/41e554ae-5609-4660-8080-a24decd399b7-IMG_1593.jpeg?crop=2015,1134,x0,y151&width=2015&height=1134&format=pjpg&auto=webp";

    return (
        <Drawer
            sx={{
                width: 200,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 220,
                    boxSizing: 'border-box',
                    zIndex: 1
                },
            }}
            variant="permanent"
            anchor="left"
            className="office-dashboard-drawer">
            <Toolbar style={{padding: '15px', display: 'flex', justifyContent: 'space-around'}}>
                <img style={{height: '50px', width: '50px', borderRadius: '5px'}} src={urlImage}/>
                <p style={{color: '#1F1F22', fontSize: '14px'}}>mail@mail.com</p>
            </Toolbar>
            <Divider/>
            <List>
                <ListItem button key={"Eventos"}
                          style={{color: optionSelected ? "#6B7DE5" : "#252733"}}
                          className="dashboard-item">
                    <ListItemButton>
                          <ListItemIcon>
                            <EventIcon/>
                          </ListItemIcon>
                        <ListItemText primary={"Eventos"} onClick={() => navigate(EVENTS_PATH)}/>
                    </ListItemButton>
                </ListItem>
            </List>
            <div style={{marginTop: 'auto'}}>
            <Divider/>
            <ListItem button key={"Salir"}
                      style={{color: optionSelected ? "#6B7DE5" : "#252733"}}
                      className="dashboard-item">
                      <ListItemButton>
                          <ListItemIcon>
                            <LogoutIcon/>
                          </ListItemIcon>
                          <ListItemText primary={"Salir"} onClick={() => handleLogOut()}/>
                    </ListItemButton>
            </ListItem>
            </div>
        </Drawer>
    );
}
