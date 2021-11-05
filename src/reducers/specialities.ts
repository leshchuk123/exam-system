import { IDataTableReducer, IDataTableState, IDataSpeciality } from "../interfaces/data";
import { FETCH_STATE } from "../constants/data";

const initialState: IDataTableState<IDataSpeciality> = {
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
        }
    },
    status: FETCH_STATE.NONE,
    error: "",
};

const specialitiesReducer: IDataTableReducer<IDataSpeciality> = (state = initialState, action = null) => {
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
        case "specialities_clear":
            return { ...state, data: [], status: FETCH_STATE.NONE };
        case "specialities_fetch_start":
            return { ...state, data: [], error: "", status: FETCH_STATE.LOADING };
        case "specialities_fetch_error":
            return { ...state, data: [], page: 1, total: 0, error, status: FETCH_STATE.LOADED };
        case "specialities_set":
            return { ...state, data, page, total, pageSize, sort, filter, status: FETCH_STATE.LOADED };
        default:
            return state;
    }
};

export default specialitiesReducer;
