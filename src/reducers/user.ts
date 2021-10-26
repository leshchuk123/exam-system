import { USER } from "../constants/actions";
import { IDataUser } from "../interfaces/data";
import * as users from "../api/users";
import { AppDispatch } from "../store";

interface IReducer {
    (state?: IDataUser, action?: {type?: USER, payload?: IDataUser}): void
}
const initialState: IDataUser = {
    id: 0,
    firstName: "",
    lastName: "",
    userUid: "",
    hiringDate: 0,
    accessDate: 0,
    speciality: 0,
    grade: 0,
};

export const auth = (email: string, password: string) => (dispatch: AppDispatch) => {
    users.auth(email, password)
        .then(response => {
            if (response.status === 200 || response.status === 201) return response.json();
            else return null;
        })
        .then(json => {
            debugger
            dispatch({type: USER.SET, payload: json});
        })
}

const pageReducer = (state = initialState, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case USER.SET:
            return { ...state, ...payload };
        default:
            return state;
    }
};

export default pageReducer;
