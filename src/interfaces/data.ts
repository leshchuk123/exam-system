import { DataTableFilterParams, DataTableSortParams } from 'primereact/datatable';
import { FETCH_STATE } from "../constants/data";

export interface IDataUser {
    id?: number
    userUid?: string
    name?: string
    surname?: string
    email?: string
    speciality?: number | IDataSpeciality
    grade?: number
    hiringDate?: string
    accessDate?: string
    roles?: number
}
export interface IDataSpeciality {
    id: number
    name: string
}
export interface IDataTask {
    id?: number
    text: string
    speciality: number | IDataSpeciality
    grade: number
    mode: number | IDataMode
}
export interface IDataMode {
    id: number
    name: string
}
export interface IDataAttempt {
    id?: number
    user?: number | IDataUser
    reviewer?: number | IDataUser
    examDate?: string 
    result?: number
}
export interface IDataOption {
    id?: number
    task?: number | IDataTask
    text?: string
    regEx?: string | RegExp
    correct?: boolean
}
export interface IDataAnswer {
    id?: number
    attempt?: number | IDataAttempt
    task?: number | IDataTask
    option?: number | IDataOption
}
export type IDataAll = IDataAnswer & IDataAttempt & IDataMode & IDataOption & IDataSpeciality & IDataTask & IDataUser & {[key: string]:string};

export interface IHistoryItem extends IDataAttempt {
    tasks: (IDataTask & {
        option: IDataOption
    })[]
}

export interface IUserReducer {
    (
        state?: IUserState, 
        action?: IUserAction | null | undefined
    ): IUserState
}
export interface IUserState {
    data: IDataUser
    status: FETCH_STATE
    error: string
}
export interface IUserAction {
    type: string
    payload?: {
        data?: IDataUser 
        error?: string 
    }
}

export interface IDataTableReducer<T> {
    (
        state?: IDataTableState<T>, 
        action?: IDataTableAction<T>| null | undefined
    ): IDataTableState<T>
}
export interface IDataTableState<T> {
    data: T[]
    page: number
    total: number
    pageSize: number
    sort: DataTableSortParams
    filter: DataTableFilterParams 
    status: FETCH_STATE
    error: string
}
export interface IDataTableAction<T> {
    type: string
    payload: {
        data: T[]
        page: number
        total: number
        pageSize: number
        sort: DataTableSortParams 
        filter: DataTableFilterParams 
        error: string
    }
}
export interface IDataTableAPIResponse<T> {
    data: T[],
    page: number,
    total: number,
    pageSize: number,
    sort: DataTableSortParams 
    filter: DataTableFilterParams 
}

export interface IListOptions {
    sort?: DataTableSortParams 
    filter?: DataTableFilterParams 
}
