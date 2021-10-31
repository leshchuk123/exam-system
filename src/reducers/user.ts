import { USER } from "../constants/actions";
import { IUserState, IUserReducer } from "../interfaces/data";
import { FETCH_STATE } from "../constants/data";

const initialState: IUserState = {
    data: {
        id: 0,
        firstName: "",
        lastName: "",
        userUid: "",
        hiringDate: "",
        accessDate: "",
        speciality: 0,
        grade: 0,
    },
    status: FETCH_STATE.NONE,
    error: ""
};

const userReducer: IUserReducer = (state = initialState, action = null) => {
    const { type, payload } = action || {};
    const { error = "", data = state.data } = payload || {};
    
    switch (type) {
        case USER.FETCH_START:
            return { ...state, data: initialState.data, status: FETCH_STATE.LOADING };
        case USER.FETCH_ERROR:
            return { ...state, error, status: FETCH_STATE.LOADED };
        case USER.SET:
            return { ...state, data, status: FETCH_STATE.LOADED };
        default:
            return state;
    }
};

export default userReducer;
