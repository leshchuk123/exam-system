import React, { FC } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { v4 as uuidv4 } from "uuid";

import NavLink, { IProps as INavLinkData } from "../NavLink";

import "./nav.scss";

interface IProps {
    links?: INavLinkData[]
}

const Navigation: FC<IProps & RouteComponentProps> = ({ history }): JSX.Element => {
    const { pathname } = history.location;
    
    return <div className="navigation">
        <NavLink text="Пользователи" link="/users" active={/\/users/.test(pathname) || pathname === "/"} />
        <NavLink text="Задания" link="/tasks" active={/\/tasks/.test(pathname)} />
    </div>
}

export default withRouter(Navigation);