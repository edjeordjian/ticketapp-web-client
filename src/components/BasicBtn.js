import { Button } from "@mui/material";
import * as React from "react";

const styles = {
    btnStyle: {
        backgroundColor: '#1A55D7',
        borderRadius: '25px',
        padding: '10px 80px',
        color: 'white',
        border: 'none',
        fontSize: '16px',
        textTransform: 'capitalize'
    }
}

export default function BasicBtn(props) {
    return (
        <Button
            type={props.type || "button"}
            variant="contained"
            onClick = {props.onClick}
            style={{...(styles.btnStyle), ...(props.styles)}}
        >
            {props.label}
        </Button>
    )
}