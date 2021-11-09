import { IListOptions, IDataTableAPIResponse, IDataTask, IDataAny } from "../../interfaces/data";
import { AppDispatch } from "../../store";
import { errToStr, isOK } from "../../helpers";
import { del, get, list } from "../api/table";

const pluralize = require('pluralize');

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
        .then(res => {
            if (isOK(res)) return res.json();
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

export const deleteTableRecord = (table: string, id: number, dispatch: AppDispatch) => {
    dispatch({ type: `${table}_delete_start` });
    
    del(table, id)
        .then(res => {
            const {page = 1, pageSize = 20, options = {}} = JSON.parse(String(localStorage.getItem(`exams:table:${table}`)));
            return fetchTableData(table, page, pageSize, options, dispatch);
        });
}

export const getTableRecord = (table: string, id: number, dispatch: AppDispatch) => {
    dispatch({ type: `${pluralize.singular(table)}_fetch_start` });
    
    get(table, id)
        .then(res => {
            if (isOK(res)) return res.json();
            else return null;
        })
        .then((json) => {
            const { page, total, pageSize, data, sort, filter } = json;
            dispatch({
                type: `${pluralize.singular(table)}_set`,
                payload: { data, page, pageSize, total, sort, filter }
            });
        })
        .catch(error => {
            dispatch({
                type: `${pluralize.singular(table)}_fetch_error`,
                payload: { error: errToStr(error) }
            })
        });
}