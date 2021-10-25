import React, { useState } from 'react';
import { useSelector } from "react-redux";

import './App.scss';

import Header from "./components/Header";
import LoginModal from "./components/LoginModal";

import { selectUserID } from "./app/reducers/user";

function App() {

    const userId = useSelector(selectUserID);

    return (
        <div className="App">
            <Header />
            <LoginModal open={!userId} />
        </div>
    );
}

export default App;
