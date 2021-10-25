import React, { FC, MouseEventHandler, ReactPortal, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import Button from "../ui/Button";

import "./modal.scss";

interface IModal {
    closable?: boolean
    open?: boolean
}

const Modal: FC<IModal> = (props): ReactPortal => {
    const {
        closable = true,
        open = false,
    } = props;

    const [ isOpen, setIsOpen ] = useState<boolean>(open);

    useEffect(() => {
        setIsOpen(open);
    }, [ open ])

    const close: MouseEventHandler = e => {
        e.stopPropagation();
        const target = e.target as HTMLElement;
        if (closable && target.classList.contains("modal_shim")) setIsOpen(false);
    }

    return createPortal(
        <div className={`modal_shim ${isOpen ? "on" : "off"}`} onClick={close}>
            <div className="modal">
                {closable && <Button icon="close" unhover onClick={() => {setIsOpen(false)}} />}
                { props.children }
            </div>
        </div>,
        document.body
    );
}

export default Modal;