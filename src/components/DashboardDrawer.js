import React from "react";
import {Divider, Drawer, List, ListItem, ListItemText, Toolbar} from "@mui/material";


export default class DashboardDrawer extends React.Component {

    isOptionSelected(view) {
        return true
        //return this.props.viewSelected === view;
    }

    render() {
        const text = "Eventos";
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
                className="office-dashboard-drawer"
            >
                <Toolbar/>
                <Divider/>
                <List>
                    <ListItem button key={text}
                                style={{color: this.isOptionSelected(text) ? "#6B7DE5" : "#252733"}}
                                className="dashboard-item">
                        <ListItemText primary={text} onClick={() => console.log('Hola')}/>
                    </ListItem>
                </List>
                <Divider/>
            </Drawer>
        )
    }
}