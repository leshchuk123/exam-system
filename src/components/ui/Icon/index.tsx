import React, { FC, ReactElement, useState } from "react";

import { clearJoin } from "../../../helpers/array";

import { IUIComponent } from "../../../interfaces/components";

import "./icon.scss";

export enum ICON_SIZE {
    XS = "xs", // 16
    SM = "sm", // 20
    MD = "md", // 24
    LG = "lg", // 32
    XL = "xl", // 48
    XXL = "xxl", // 64
    HG = "hg", // 128
}

export interface IIcon extends IUIComponent {
    name: string
    size?: ICON_SIZE
    color?: string
    pi?: boolean
}

const Icon: FC<IIcon> = (props): ReactElement => {
    let {
        name,
        size = ICON_SIZE.MD,
        className = "",
        style = {},
        color = "",
        pi = true,
    } = props;

    const [icon, setIcon] = useState<string>();
    
    const cls = ["icon", size, color, ...className.split(/\s+/g)];
    if (color) style = { ...style, color}

    if (pi) {
        return <i className={`pi pi-${name} ${size} ${color} ${className}`} style={style}></i>
    }else{
        import(`../../../assets/icons/${name}.svg`).then((result) => {
            setIcon(result.default)
        })
        
        return <div className={ clearJoin( ...cls ) } style={style}>
            {icon && <img src={icon} alt={`Icon ${name}`} />}
        </div>
    }
}

export default Icon;