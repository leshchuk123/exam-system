import { IListOptions, IDataTableAPIResponse, IDataTask } from "../../interfaces/data";
import { AppDispatch } from "../../store";
import { errToStr } from "../../helpers";
import { list } from "../api/table";

export const fetchTableData = function(
    table: string,
    page: number,
    pageSize: number,
    options: IListOptions,
    dispatch: AppDispatch
) {
    dispatch({ type: `${table}_fetch_start` });

    list(table, page, pageSize, options)
        .then(response => {
            if (response.status === 200 || response.status === 201) return response.json();
            else return null;
        })
        .then((json) => {
            const { page, total, pageSize, data, sort, filter } = json as IDataTableAPIResponse<IDataTask>;
            dispatch({
                type: `${table}_set`,
                payload: { data, page, pageSize, total, sort, filter }
            });
        })
        .catch(error => {
            dispatch({
                type: `${table}_fetch_error`,
                payload: { error: errToStr(error) }
            })
        });
}

