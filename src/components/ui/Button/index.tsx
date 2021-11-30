import { FC, ReactElement } from "react";
import { clearJoin } from "../../../helpers/array";
import { IClickableElement, IUIComponent } from "../../../interfaces/components";

import Icon, { ICON_SIZE } from "../Icon";

import "./button.scss";

export interface IButton extends IUIComponent, IClickableElement {
    text?: string
    disabled?: boolean
    active?: boolean
    type?: BTN_TYPE
    size?: BTN_SIZE
    icon?: string
    unhover?: boolean
}
export enum BTN_TYPE {
    NONE = "",
    PRIMARY = "primary",
    SECONDARY = "secondary",
    WARN = "warning",
    DANGER = "danger",
}
export enum BTN_SIZE {
    SM = "small",
    MD = "",
    LG = "large",
    HG = "huge",
}

const Button: FC<IButton> = (props): ReactElement => {
    const {
        text = "",
        type = BTN_TYPE.NONE,
        size = BTN_SIZE.MD,
        disabled = false,
        active = false,
        onClick = () => void 0,
        className = "",
        style = {},
        icon,
        unhover = false,
    } = props;
    const cls = ["btn", type, size, ...className.split(/\s+/g)];
    if (disabled) cls.push("disabled");
    else if (active) cls.push("active");
    if (unhover) cls.push("unhover");

    return <div className={ clearJoin( ...cls ) } onClick={onClick} style={style}>
        {icon && <Icon name={icon} size={ICON_SIZE.XS} />}
        {text}
    </div>;
}

export default Button;