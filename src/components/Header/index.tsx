import React from "react";

import Button from "../ui/Button";
import logo from "../../assets/images/sokolov-logo_ru.svg";

import "./header.scss";
import { BTN_TYPE } from "../../interfaces/enums";

const Header = () => {
    return <div className="container header">
        <div className="brand">
            <img src={logo} id="logo" alt="SOKOLOV EXAMS SYSTEM" />
            <div className="title">
                Exams System
            </div>
        </div>
        <div className="menu">
            <Button text="Normal" />
            <Button type={BTN_TYPE.PRIMARY} text="Primary" />
            <Button type={BTN_TYPE.SECONDARY} text="Secondary" />
            <Button type={BTN_TYPE.DANGER} text="Danger" />
        </div>
    </div>
}

export default Header;