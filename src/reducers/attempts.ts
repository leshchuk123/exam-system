import { IDataTableReducer, IDataTableState, IDataAttempt } from "../interfaces/data";
import { FETCH_STATE } from "../constants/data";

const initialState: IDataTableState<IDataAttempt> = {
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

const attemptsReducer: IDataTableReducer<IDataAttempt> = (state = initialState, action = null) => {
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
        case "attempts_clear":
            return { ...state, data: [], status: FETCH_STATE.NONE };
        case "attempts_fetch_start":
            return { ...state, data: [], error: "", status: FETCH_STATE.LOADING };
        case "attempts_fetch_error":
            return { ...state, data: [], page: 1, total: 0, error, status: FETCH_STATE.LOADED };
        case "attempts_set":
            return { ...state, data, page, total, pageSize, sort, filter, status: FETCH_STATE.LOADED };
        default:
            return state;
    }
};

export default attemptsReducer;
