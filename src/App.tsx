// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react';

import './App.scss';

import Header from "./components/Header";
import LoginModal from "./components/LoginModal";

import { RootState } from './store';
import { connect } from 'react-redux';
import Button, { BTN_SIZE, BTN_TYPE } from './components/ui/Button';

interface IAppProps {
    userUid?: string
}
function App(props: IAppProps) {
    const { userUid } = props;

    return (
        <div className="App">
            <Header />
            <LoginModal open={!userUid} />
            <div className="flex gap-10" style={{alignItems:"center"}}>
                <Button type={BTN_TYPE.PRIMARY} text="Small" size={BTN_SIZE.SM} />
                <Button type={BTN_TYPE.PRIMARY} text="Normal" size={BTN_SIZE.MD} />
                <Button type={BTN_TYPE.PRIMARY} text="Large" size={BTN_SIZE.LG} />
                <Button type={BTN_TYPE.PRIMARY} text="Huge" size={BTN_SIZE.HG} />
            </div>
        </div>
    );
}

const mapStateToProps = (state: RootState) => {
    const { userUid } = state.user;
    return { userUid }
}

export default connect(mapStateToProps)(App);
