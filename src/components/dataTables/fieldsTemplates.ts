import { IDataMode, IDataSpeciality, IDataTask, IDataUser } from "../../interfaces/data";

export const userNameTemplate = (record: IDataUser): string => {
    return `${record.lastName} ${record.firstName}`;
}
export const specialityTemplate = (record: IDataUser | IDataTask) => {
    return (record.speciality as IDataSpeciality).name;
}
export const modeTemplate = (record: IDataTask) => {
    return (record.mode as IDataMode).name;
}

