import { USER } from "../constants/actions";
import { IDataUser, IReducer, IReducerState } from "../interfaces/data";
import { users } from "../api/users";
import { AppDispatch } from "../store";
import { FETCH_STATE } from "../constants/data";

const initialState: IReducerState<IDataUser> = {
    data: {
        id: 0,
        firstName: "",
        lastName: "",
        userUid: "",
        hiringDate: 0,
        accessDate: 0,
        speciality: 0,
        grade: 0,
    },
    status: FETCH_STATE.NONE,
    error: ""
};

export const auth = (email: string, password: string, dispatch: AppDispatch) => {
    dispatch({ type: USER.FETCH_START });

    users.auth(email, password)
        .then(response => {
            if (response.status === 200 || response.status === 201) return response.json();
            else return null;
        })
        .then((json: { users: IDataUser }) => {
            dispatch({ type: USER.SET, payload: { data: json.users } });
        })
        .catch(error => {
            dispatch({ type: USER.FETCH_ERROR, payload: { error: error } })
        });
}

const userReducer: IReducer<IDataUser> = (state = initialState, action = {}): IReducerState<IDataUser> => {
    const { type, payload = { error: "", data: {}} } = action;

    switch (type) {
        case USER.FETCH_START:
            return { ...state, data: {}, status: FETCH_STATE.LOADING };
        case USER.FETCH_ERROR:
            return { ...state, error: payload.error, status: FETCH_STATE.LOADED };
        case USER.SET:
            return { ...state, data: payload.data, status: FETCH_STATE.LOADED };
        default:
            return state;
    }
};

export default userReducer;
