// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC, lazy, useEffect, useState } from 'react';
import { Route, Switch } from "react-router";
import { compose } from "recompose";

import { withRouter } from "react-router-dom";

import './app.scss';

import Header from "../components/Header";
import LoginModal from "../components/LoginModal";

import { RootState } from '../store';
import { connect, ConnectedProps } from 'react-redux';
import Navigation from '../components/Navigation';
import Brand from '../components/Brand';
import { FETCH_STATE } from '../constants/data';

import UsersTable from "../components/dataTables/Users";

const mapState = (state: RootState) => {
    const { data, status, error } = state.user;
    return { data, status, error }
}
const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

const App: FC<PropsFromRedux> = (props): JSX.Element => {
    const { data, status, error } = props;

    return (
        <div className="app_container">
            <Brand />
            <Header />
            <Navigation />
            <LoginModal open={!data?.userUid && status !== FETCH_STATE.LOADING} error={String(error)} />
            <Switch>
                <Route path="/" exact component={UsersTable} />
                <Route path="/users" component={UsersTable} />
            </Switch>
        </div>
    );
}

export default connector(App);

