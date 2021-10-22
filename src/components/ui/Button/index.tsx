import React, { FC, MouseEventHandler, ReactElement } from "react";
import { classes } from "../../../helpers/styles";

import { BTN_TYPE } from "../../../interfaces/enums";

import "./button.scss";

export interface IProps {
    text?: string
    disabled?: boolean
    active?: boolean
    type?: BTN_TYPE
    onClick?: MouseEventHandler<HTMLDivElement>
}

const Button: FC<IProps> = (props): ReactElement => {
    const {
        text = "",
        type = BTN_TYPE.NONE,
        disabled = false,
        active = false,
        onClick = () => void 0,
    } = props;
    const cls = ["btn", type];
    if (disabled) cls.push("disabled");
    else if (active) cls.push("active");

    return <div className={ classes( ...cls ) } onClick={onClick}>
        {text}
    </div>;
}

export default Button;