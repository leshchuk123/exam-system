import React, { CSSProperties, FC, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { clearJoin } from "../../helpers";

import "./navlink.scss";

export interface IProps {
    text: string
    link: string
    active?: boolean
    disabled?: boolean
    unhover?: boolean
    className?: string
    style?: CSSProperties
    onClick?: MouseEventHandler
}
const NavLink: FC<IProps> = (props): JSX.Element => {
    const {
        text,
        active = false,
        disabled = false,
        unhover = false,
        className = "",
        style = {},
        link,
        onClick = () => void 0,
    } = props;

    const cls = ["navlink", ...className.split(/\s+/g)];
    if (disabled) cls.push("disabled");
    else if (active) cls.push("active");
    if (unhover) cls.push("unhover");

    return <Link
        className={clearJoin(...cls)}
        style={style}
        to={link}
        onClick={onClick}
    >
        {text}
    </Link>
}

export default NavLink;