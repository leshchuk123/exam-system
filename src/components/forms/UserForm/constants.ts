import { IDataUser } from "../../../interfaces/data";
import { v4 as uuidv4 } from "uuid";

export const defaults: IDataUser = {
    userUid: uuidv4(),
    name: "",
    surname: "",
    email: "",
    speciality: undefined,
    grade: 1,
    hiringDate: undefined,
    accessDate: undefined,
    roles: 1,
};
export const defFetchingState = {
    data: false,
    specialities: false,
}
