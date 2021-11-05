import { IDataUser, IDataTableReducer, IDataTableState } from "../interfaces/data";
import { FETCH_STATE } from "../constants/data";

const initialState: IDataTableState<IDataUser> = {
    data: [],
    page: 1,
    pageSize: 20,
    total: 0,
    sort: {
        sortField: "",
        sortOrder: 1,
        multiSortMeta: undefined
    },
    filter: {
        filters: {
            firstName: { value: "", matchMode: "contains" },
            specialities: { value: [], matchMode: "in" },
            grades: { value: [], matchMode: "in" },
            roles: { value: 0, matchMode: "custom" },
        }
    },
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
        sort,
        filter,
        error = "",
    } = payload || {};
    switch (type) {
        case "users_clear":
            return { ...state, data: [], status: FETCH_STATE.NONE };
        case "users_fetch_start":
            return { ...state, data: [], error: "", status: FETCH_STATE.LOADING };
        case "users_fetch_error":
            return { ...state, data: [], page: 1, total: 0, error, status: FETCH_STATE.LOADED };
        case "users_set":
            return { ...state, data, page, total, pageSize, sort, filter, status: FETCH_STATE.LOADED };
        default:
            return state;
    }
};

export default usersReducer;
