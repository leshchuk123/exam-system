import { IDataTask, IDataOption } from "../../../interfaces/data";

export interface IIsFetching {
    data: boolean
    specialities: boolean
    modes: boolean
    options: boolean
}
export interface IErrors {
    data?: string
    specialities?: string
    modes?: string
    options?: string
    save?: string
}
export interface ITask extends IDataTask {
    options?: IDataOption[]
}
