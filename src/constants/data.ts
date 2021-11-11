export enum SORT_DIR {
    ASC = "ASC",
    DESC = "DESC",
}
export enum FETCH_STATE {
    NONE,
    LOADING,
    LOADED
}
export enum ROLE {
    EXAMINEE = 1,
    ADMIN = 2,
    SUPERVISOR = 4
}
export const ROLES = [
    { text: "Пользователи", value: ROLE.EXAMINEE },
    { text: "Администраторы", value: ROLE.ADMIN },
    { text: "Руководители", value: ROLE.SUPERVISOR },
];
export const dicCollections: { [key: string]: string } = {
    users: "Пользователи",
    tasks: "Задания",
};
export const MS = {
    SECOND: 1000,
    MINUTE: 60*1000,
    HOUR: 3600000,
    DAY: 86400000,
    WEEK: 604800000,
}
export const COLOR = {
    success: "#689F38",
    info: "#0288D1",
    warning: "#FBC02D",
    help: "#9C27B0",
    danger: "#D32F2F",
}