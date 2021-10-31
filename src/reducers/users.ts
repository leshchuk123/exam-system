import { USERS } from "../constants/actions";
import { IDataUser, IDataTableReducer, IDataTableState } from "../interfaces/data";
import { FETCH_STATE } from "../constants/data";

const initialState: IDataTableState<IDataUser> = {
    data: [],
    page: 1,
    pageSize: 20,
    total: 0,
    sort: null,
    filter: null,
    status: FETCH_STATE.NONE,
    error: "",
};

const usersReducer: IDataTableReducer<IDataUser> = (state = initialState, action = null) => {
    const emptyPayload = () => ({ ...state, page: 1, total: 0, data: [] })
    const { type, payload = emptyPayload() } = action || {};
    const {
        data = [],
        page = 1,
        total = 0,
        pageSize = state.pageSize,
        sort = null,
        filter = null,
        error = "",
    } = payload || {};
    switch (type) {
        case USERS.CLEAR:
            return { ...state, data: [], status: FETCH_STATE.NONE };
        case USERS.FETCH_START:
            return { ...state, data: [], error: "", status: FETCH_STATE.LOADING };
        case USERS.FETCH_ERROR:
            return { ...state, data: [], page: 1, total: 0, error, status: FETCH_STATE.LOADED };
        case USERS.SET:
            return { ...state, data, page, total, pageSize, sort, filter, status: FETCH_STATE.LOADED };
        default:
            return state;
    }
};

export default usersReducer;
