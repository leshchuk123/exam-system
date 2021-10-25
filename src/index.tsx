import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';
import { makeServer } from "./app/server";
import { dump } from "./mocks/constants";

import App from './App';

import store from "./app/store";

import './index.css';

console.log("NODE_ENV", process.env.NODE_ENV)
if (process.env.NODE_ENV === "development") {
    const server = makeServer({ environment: "development" });
    server.db.loadData(dump)
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
