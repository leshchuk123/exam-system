import React, { useEffect, useState } from 'react';

import './App.scss';

import Header from "./components/Header";
import LoginModal from "./components/LoginModal";

import { useAppSelector } from "./app/hooks";

function App() {

    const user = useAppSelector(state => state.user);
    console.log(Date.now(), 1, {user})
    const [openAuth, setOpenAuth] = useState(true);

    useEffect(() => {
        console.log(Date.now(), 3, {user})
        debugger
        // setOpenAuth(!user.userUid)
    }, [user]);

    return (
        <div className="App">
            <Header />
            <LoginModal open={openAuth} />
        </div>
    );
}

export default App;
