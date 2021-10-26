import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';
import { makeServer } from "./mirage/server";
import { dump } from "./mirage/mocks/constants";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';

import App from './App';

import store from "./store";

import './index.css';

const history = createBrowserHistory();

if (process.env.NODE_ENV === "development") {
    const server = makeServer({ environment: "development" });
    server.db.loadData(dump);
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
