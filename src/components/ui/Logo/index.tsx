import React, { FC, ReactElement } from "react";
import { IClickableElement, IUIComponent } from "../../../interfaces/components";

import { clearJoin } from "../../../helpers/array";
import logo from "../../../assets/images/sokolov-logo_ru.svg";

const Logo: FC<IUIComponent & IClickableElement> = (props): ReactElement => {
    let {
        className = "",
        onClick,
        style = {},
        ...rest
    } = props;

    if (onClick) style = { ...style, cursor: "pointer" };
    const cls = [ "logo", ...className.split(/\s+/g) ];

    return <img 
        className={ clearJoin( ...cls ) } 
        src={logo} 
        alt="SOKOLOV EXAMS SYSTEM" 
        onClick={onClick} 
        style={style}
        { ...rest }
    />;
}

export default Logo;