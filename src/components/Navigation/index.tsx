import React, { FC, useContext } from "react";
import { connect, ConnectedProps } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { ROLE } from "../../constants/data";
import { RootState } from "../../store";
import { AppContext } from "../../app/App";

import NavLink, { IProps as INavLinkData } from "../NavLink";
import Divider from "./divider";

import "./nav.scss";

const Navigation: FC<RouteComponentProps> = ({ history }): JSX.Element => {
    const { pathname } = history.location;
    const { user } = useContext(AppContext);
    const {
        userUid = "",
        roles = 0,
        grade = 0,
    } = user;
    const isAdmin = (roles & ROLE.ADMIN) > 0;
    const mayExam = grade < 16;
    const authorized = !!userUid;
    
    return <div className="navigation">
        {authorized && <>
            <NavLink text="История" link="/history" active={/\/history/.test(pathname) || pathname === "/"} />
            <Divider />
        </>}
        {isAdmin && <>
            <NavLink text="Пользователи" link="/users" active={/\/users/.test(pathname)} />
            <NavLink text="Задания" link="/tasks" active={/\/tasks/.test(pathname)} />
            <Divider />
        </>}
        {mayExam && <>
            <NavLink text="Экзамен" link="/exam" active={/\/exam/.test(pathname)} />
            <Divider />
        </>}

    </div>
}

export default withRouter(Navigation);