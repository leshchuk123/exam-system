import { IDataTableReducer, IDataTableState, IDataTask } from "../interfaces/data";
import { FETCH_STATE } from "../constants/data";

const initialState: IDataTableState<IDataTask> = {
    data: [],
    page: 1,
    pageSize: 20,
    total: 0,
    sort: null,
    filter: null,
    status: FETCH_STATE.NONE,
    error: "",
};

const usersReducer: IDataTableReducer<IDataTask> = (state = initialState, action = null) => {
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
        case "tasks_clear":
            return { ...state, data: [], status: FETCH_STATE.NONE };
        case "tasks_fetch_start":
            return { ...state, data: [], error: "", status: FETCH_STATE.LOADING };
        case "tasks_fetch_error":
            return { ...state, data: [], page: 1, total: 0, error, status: FETCH_STATE.LOADED };
        case "tasks_set":
            return { ...state, data, page, total, pageSize, sort, filter, status: FETCH_STATE.LOADED };
        default:
            return state;
    }
};

export default usersReducer;
