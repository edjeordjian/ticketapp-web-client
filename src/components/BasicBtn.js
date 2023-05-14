import { Button } from "@mui/material";
import * as React from "react";
import { basicButtonStyle } from "../styles/events/BasicButtonStyle";
import { basicButtonSucessStyle } from "../styles/events/BasicButtonSucessStyle";

export default function BasicBtn(props) {
  if (!props.color){
    return (
      <Button
        type={props.type || "button"}
        variant="contained"
        onClick={props.onClick}
        style={basicButtonStyle.btnStyle}
        disabled={props.disabled}
      >
        {props.label}
      </Button>
    );
  }
  return (
    <Button
      type={props.type || "button"}
      variant="contained"
      onClick={props.onClick}
      style={basicButtonSucessStyle.btnStyle}
      disabled={props.disabled}
    >
      {props.label}
    </Button>
  );
}
