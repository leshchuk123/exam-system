import { ROLE } from "../../constants/data";
import { IDataMode, IDataSpeciality, IDataTask, IDataUser } from "../../interfaces/data";

export const userNameTemplate = (record: IDataUser): string => {
    return `${record.firstName} ${record.lastName}`;
}
export const specialityTemplate = (record: IDataUser | IDataTask) => {
    const { id, name } = record.speciality as IDataSpeciality;
    return id === 0 ? "" : name;
}
export const modeTemplate = (record: IDataTask) => {
    return (record.mode as IDataMode).name;
}
export const rolesTemplate = (record: IDataUser) => {
    const arr = [];
    if (Number(record.roles) & ROLE.SUPERVISOR) arr.push("Руководители");
    if (Number(record.roles) & ROLE.ADMIN) arr.push("Администраторы");
    if (Number(record.roles) & ROLE.EXAMINEE) arr.push("Пользователи");
    return arr.join(", ");
}
