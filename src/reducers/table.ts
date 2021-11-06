import { IDataTableReducer, IDataTableState } from "../interfaces/data";
import { FETCH_STATE } from "../constants/data";
import { DataTableFilterMeta } from "primereact/datatable";

const tableReducerFactory = function <T>(name: string, filters: DataTableFilterMeta) {
    const initialState: IDataTableState<T> = {
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
    
    const reducer: IDataTableReducer<T> = (state = initialState, action = null) => {
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
            case `${name}_clear`:
                return { ...state, data: [], status: FETCH_STATE.NONE };
            case `${name}_fetch_start`:
                return { ...state, data: [], error: "", status: FETCH_STATE.LOADING };
            case `${name}_fetch_error`:
                return { ...state, data: [], page: 1, total: 0, error, status: FETCH_STATE.LOADED };
            case `${name}_set`:
                return { ...state, data, page, total, pageSize, sort, filter, status: FETCH_STATE.LOADED };
            default:
                return state;
        }
    };

    return reducer;
}


export default tableReducerFactory;
