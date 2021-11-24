import { IUserState, IUserReducer, IDataUser } from "../interfaces/data";
import { FETCH_STATE } from "../constants/data";

export const defaultUser: IDataUser = {
    id: 0,
    name: "",
    surname: "",
    userUid: "",
    hiringDate: "",
    accessDate: "",
    speciality: 0,
    grade: 0,
};
export const initialState: IUserState = {
    data: defaultUser,
    status: FETCH_STATE.NONE,
    error: ""
};

const userReducer: IUserReducer = (state = initialState, action = null) => {
    const { type, payload } = action || {};
    const { error = "", data = state.data } = payload || {};
    
    switch (type) {
        case "user_state_start":
            return { ...state, data: initialState.data, status: FETCH_STATE.LOADING };
        case "user_fetch_error":
            return { ...state, error, status: FETCH_STATE.LOADED };
        case "user_set":
            return { ...state, data, status: FETCH_STATE.LOADED };
        case "user_signout":
            return { ...initialState };
        default:
            return state;
    }
};

export default userReducer;
