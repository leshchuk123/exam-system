import { USERS } from "../constants/actions";
import { IDataUser, IListOptions, IReducer, IReducerState } from "../interfaces/data";
import { users } from "../api/users";
import { AppDispatch } from "../store";
import { FETCH_STATE } from "../constants/data";

const initialState: IReducerState<IDataUser[]> = {
    data: [],
    page: 1,
    total: 0,
    status: FETCH_STATE.NONE,
    error: "",
};

export const fetchUsers = (page = 1, options: IListOptions = {}, dispatch: AppDispatch) => {
    dispatch({ type: USERS.FETCH_START });

    users.list(page, options)
        .then(response => {
            if (response.status === 200 || response.status === 201) return response.json();
            else return null;
        })
        .then((json) => {
            const { page, total, data } = json as { page: number, total: number, data: IDataUser[] };
            dispatch({ type: USERS.SET, payload: { data, page, total } });
        })
        .catch(error => {
            dispatch({ type: USERS.FETCH_ERROR, payload: { error: error } })
        });
}

const usersReducer: IReducer<IDataUser[]> = (state = initialState, action = {}): IReducerState<IDataUser[]> => {
    const { type, payload = {error: "", data: []} } = action;

    switch (type) {
        case USERS.FETCH_START:
            return { ...state, data: [], status: FETCH_STATE.LOADING };
        case USERS.FETCH_ERROR:
            return { ...state, error: payload.error, status: FETCH_STATE.LOADED };
        case USERS.SET:
            return { ...state, data: payload.data, status: FETCH_STATE.LOADED };
        default:
            return state;
    }
};

export default usersReducer;
