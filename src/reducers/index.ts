import { combineReducers } from "redux";
import user from "./user";
import users from "./users";
import tasks from "./tasks";

const rootReducer = combineReducers({
    user,
    users,
    tasks,
});

export default rootReducer;
