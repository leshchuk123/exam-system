import { IListOptions, IDataTableAPIResponse, IDataTask, IDataAny } from "../../interfaces/data";
import { AppDispatch } from "../../store";
import { errToStr } from "../../helpers";
import { del, list } from "../api/table";

export const fetchTableData = (
    table: string,
    page: number,
    pageSize: number,
    options: IListOptions,
    dispatch: AppDispatch,
) => {
    dispatch({ type: `${table}_fetch_start` });
    localStorage.setItem(`exams:table:${table}`, JSON.stringify({ page, pageSize, options }));

    list(table, page, pageSize, options)
        .then(response => {
            if (response.status === 200 || response.status === 201) return response.json();
            else return null;
        })
        .then((json) => {
            const { page, total, pageSize, data, sort, filter } = json;
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

export const getFetch = (
    table: string,
    page: number,
    pageSize: number,
    options: IListOptions,
) => list(table, page, pageSize, options);

export const deleteTableRecord = (table: string, id: number, dispatch: AppDispatch) => {
    dispatch({ type: `${table}_delete_start` });
    
    del(table, id)
        .then(response => {
            const {page = 1, pageSize = 20, options = {}} = JSON.parse(String(localStorage.getItem(`exams:table:${table}`)));
            return fetchTableData(table, page, pageSize, options, dispatch);
        });
}
