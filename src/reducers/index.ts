import { combineReducers } from "redux";
import user from "./user";
import users from "./users";
import tasks from "./tasks";
import specialities from "./specialities";
import attempts from "./attempts";

const rootReducer = combineReducers({
    user,
    users,
    tasks,
    specialities,
    attempts,
});

export default rootReducer;
