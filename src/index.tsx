import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
import reportWebVitals from './reportWebVitals';

import App from './app/App';
import store from "./store";

import './index.css';
import { createServer } from './mirage/mocks/helpers';

const history = createBrowserHistory();

if (process.env.NODE_ENV === "development") {
    createServer();
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
