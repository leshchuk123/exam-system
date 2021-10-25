import { CSSProperties, MouseEventHandler } from "react";

export interface IUIComponent {
    className?: string
    style?: CSSProperties
    id?: string
}

export interface IClickableElement {
    onClick?: MouseEventHandler
}
