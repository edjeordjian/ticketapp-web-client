
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import BasicBtn from '../components/BasicBtn';
import DashboardDrawer from '../components/DashboardDrawer';
import { useNavigate } from 'react-router-dom';
import {EVENT_CREATE_PATH} from "../constants/URLs";

const styles = {
    title: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: '15px'
    },
    eventsContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '25px'
    },
    btnContainer: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: '15px'
    }
}

function displayProject(source) {
    return (
        <a onClick={() => console.log("Nada por aquí todavía")}>
            <img
                alt="not found"
                width={'100%'}
                height={'400px'}
                style={{borderRadius: 20, marginTop: '25px'}}
                src={source}
            /> 
        </a>
    )
}

export default function EventsListView(props){
    const navigate = useNavigate();
    
    const events = [
        "https://www.dfentertainment.com/wp-content/uploads/2022/06/LOLLA_1920x720-DF-1536x576.png",
        "https://www.dfentertainment.com/wp-content/uploads/2022/06/LOLLA_1920x720-DF-1536x576.png"
    ]

    const onCreateEventClicked = (e) => {
        navigate(EVENT_CREATE_PATH);
    }
    return (
        <>
            <DashboardDrawer/>
            <Box style={{marginLeft: '220px', padding: '25px'}}>
                <Box style={styles.btnContainer}>
                    <BasicBtn label={"Crear evento"} onClick={onCreateEventClicked}/>
                </Box>
                <Typography component="h1" style={styles.title}>
                    Mis eventos
                </Typography>
                <Box styles={styles.eventsContainer}>
                    {events.map((e, _) => {
                        return displayProject(e)
                    })}
                </Box>
            </Box>
        </>
    );
}