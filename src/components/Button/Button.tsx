import React from "react";
import Button from "react-bootstrap/Button";
import { ButtonMouseHandler } from "../../utilities";
import "./Button.scss";
const ButtonComponent = ( props: ButtonMouseHandler ) => {
    return <Button onClick={props.onClick} className="myButton" variant="primary"><b>{props.label || "Default button label"}</b></Button>;
};
export default ButtonComponent;
