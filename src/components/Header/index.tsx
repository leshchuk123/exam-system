import React from "react";

import Button, {BTN_TYPE} from "../ui/Button";
import Logo from "../ui/Logo";

import "./header.scss";

const Header = () => {
    return <div className="container header">
        <div className="title">
            <div className="title_text">
                Exams System
            </div>
        </div>
        <div className="brand">
            <Logo />
            {/* <img src={logo} id="logo" alt="SOKOLOV EXAMS SYSTEM" /> */}
        </div>
        <div className="menu">
            <Button text="Normal" />
            <Button icon="close" unhover />
            {/* <Button type={BTN_TYPE.PRIMARY} text="Primary" />
            <Button type={BTN_TYPE.SECONDARY} text="Secondary" />
            <Button type={BTN_TYPE.DANGER} text="Danger" /> */}
        </div>
    </div>
}

export default Header;