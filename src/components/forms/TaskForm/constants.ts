import { range } from "../../../helpers";
import { IDataTask } from "../../../interfaces/data";

export const defaults: IDataTask = {
    text: "",
    speciality: 1,
    grade: 1,
    mode: 1,
};

export const GRADES = range(1, 16, (i: number) => ({ value: i, text: `${i} грейд` }));

export const defFetchingState = {
    data: false,
    specialities: false,
    modes: false,
    options: false,
}
