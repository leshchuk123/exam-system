import { FETCH_STATE, SORT_DIR } from "../constants/data";

export interface IDataUser {
    id?: number
    userUid?: string
    firstName?: string
    lastName?: string
    speciality?: number | IDataSpeciality
    grade?: number
    hiringDate?: Date | string | number | null
    accessDate?: Date | string | number | null
}

export interface IDataSpeciality {
    id: number
    name: string
}

export interface IDataTask {
    id: number
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
    id: number
    user: number | IDataUser
    reviewer: number | IDataUser
    examDate: Date | string | number
    result: number
}

export interface IDataOption {
    id: number
    task: number | IDataTask
    text?: string
    regEx?: string | RegExp
    correct?: boolean
}

export interface IDataAnswer {
    id: number
    attempt: number | IDataAttempt
    task: number | IDataTask
    option: number | IDataOption
}

export interface IReducerAction<T> {
    type?: string
    payload?: {
        data: T
        page: number
        total: number
        error: string
    }
}

export interface IReducer<T> {
    (
        state?: IReducerState<T>, 
        action?: IReducerAction<T>
    ): IReducerState<T>
}

export interface IReducerState<T> {
    data: T
    page?: number
    total?: number
    status: FETCH_STATE
    error: string
}

export interface IListSortOption {
    field: string
    dir?: SORT_DIR
}

export interface IListFilterOption {
    field: string
    value: any
}

export interface IListOptions {
    sort?: IListSortOption[]
    filter?: IListFilterOption[]
}
