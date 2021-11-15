// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createContext, FC } from 'react';
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
import HistoryTable from "../components/dataTables/History";

import RecordForm from "../components/forms/RecordForm";
import ExamForm from '../components/forms/ExamForm';
import { IDataUser } from '../interfaces/data';
import { defaultUser } from '../reducers/user';

interface IAppContext {
    user: IDataUser;
}
export const AppContext = createContext<IAppContext>({ user: defaultUser });

const mapState = (state: RootState) => {
    const { data, status, error } = state.user;
    return { data, status, error }
}
const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

const App: FC<PropsFromRedux> = (props): JSX.Element => {
    const { data, status, error } = props;

    return (<AppContext.Provider value={{
        user: data
    }}>
        <div className="app_container">
            <Brand />
            <Header />
            <Navigation />
            <LoginModal open={!data?.userUid && status !== FETCH_STATE.LOADING} error={String(error)} />
            <Switch>
                <Route path="/" exact component={HistoryTable} />
                <Route path="/:collection/edit/:id" component={RecordForm} />
                <Route path="/:collection/new" component={RecordForm} />
                <Route path="/history" exact component={HistoryTable} />
                <Route path="/users" exact component={UsersTable} />
                <Route path="/tasks" exact component={TasksTable} />
                <Route path="/exam" exact component={ExamForm} />
            </Switch>
        </div>
    </AppContext.Provider>);
}

export default connector(App);

