// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react';
import { compose } from "recompose";

import { withRouter } from "react-router-dom";

import './app.scss';

import Header from "./components/Header";
import LoginModal from "./components/LoginModal";

import { RootState } from './store';
import { connect } from 'react-redux';
import Navigation from './components/Navigation';

interface IAppProps {
    userUid?: string
}
function App(props: IAppProps) {
    const { userUid } = props;

    return (
        <div className="app_container">
            <Header />
            <Navigation />
            <LoginModal open={!userUid} />
        </div>
    );
}

const mapStateToProps = (state: RootState) => {
    const { userUid } = state.user;
    return { userUid }
}

export default connect(mapStateToProps)(App);
// export default compose(
//     withRouter,
//     connect(mapStateToProps)
// )(App);

