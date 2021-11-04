// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC } from 'react';
import { Route, Switch } from "react-router";
import { connect, ConnectedProps } from 'react-redux';

import './app.scss';

import Header from "../components/Header";
import LoginModal from "../components/LoginModal";
import Navigation from '../components/Navigation';
import Brand from '../components/Brand';

import { RootState } from '../store';
import { FETCH_STATE } from '../constants/data';

import UsersTable from "../components/dataTables/Users";
import TasksTable from "../components/dataTables/Tasks";

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
                <Route path="/tasks" component={TasksTable} />
            </Switch>
        </div>
    );
}

export default connector(App);

