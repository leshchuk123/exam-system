import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
import reportWebVitals from './reportWebVitals';

import { makeServer } from "./mirage/server";
import { IDump } from "./mirage/mocks/constants";
import { generateDump } from './mirage/mocks/generator';

import App from './app/App';
import store from "./store";

import './index.css';

declare global {
    interface Window {
        uids: { [key: string]: string }
    }
}
const history = createBrowserHistory();

if (process.env.NODE_ENV === "development") {
    const server = makeServer({ environment: "development" });
    const savedDump = localStorage.getItem("exams_dump");
    const savedUids = localStorage.getItem("exams_uids");
    let dump: IDump;
    let uids: { [key: string]: string };
    if (savedDump && savedUids) {
        dump = JSON.parse(savedDump);
        uids = JSON.parse(savedUids);
    } else {
        const newDump = generateDump();
        dump = newDump.dump;
        uids = newDump.uids;
    }
    server.db.loadData(dump);
    window.uids = uids;
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
