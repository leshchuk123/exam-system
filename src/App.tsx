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
import Brand from './components/Brand';
import Listing from './components/ui/Listing';

interface IAppProps {
    userUid?: string
}
function App(props: IAppProps) {
    const { userUid } = props;

    return (
        <div className="app_container">
            <Brand />
            <Header />
            <Navigation />
            <LoginModal open={!userUid} />
            <Listing />
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

