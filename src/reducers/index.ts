import { combineReducers } from "redux";
import { IDataAnswer, IDataAttempt, IDataMode, IDataOption, IDataSpeciality, IDataTask, IDataUser } from "../interfaces/data";
import tableReducerFactory from "./table";
import user from "./user";

const users = tableReducerFactory<IDataUser>("users", {
    firstName: { value: "", matchMode: "contains" },
    specialities: { value: [], matchMode: "in" },
    grades: { value: [], matchMode: "in" },
    roles: { value: 0, matchMode: "custom" },
});
const tasks = tableReducerFactory<IDataTask>("tasks", {
});
const specialities = tableReducerFactory<IDataSpeciality>("specialities", {
});
const modes = tableReducerFactory<IDataMode>("modes", {
});
const attempts = tableReducerFactory<IDataAttempt>("attempts", {
});
const options = tableReducerFactory<IDataOption>("options", {
});
const answers = tableReducerFactory<IDataAnswer>("answers", {
});

const rootReducer = combineReducers({
    user,
    users,
    tasks,
    specialities,
    attempts,
    modes,
    options,
    answers,
});

export default rootReducer;
