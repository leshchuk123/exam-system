import { IListOptions } from "../../interfaces/data";
import { defaults } from "./table";

export const getExamTasks = (speciality: number, grade: number) => {
    return fetch(`/api/exam/${speciality}/${grade}`, {
        ...defaults,
    });
}

export const fetchHistory = (page: number, pageSize: number, options: IListOptions) => {
    return fetch("/api/history", {
        ...defaults,
        method: "POST",
        body: JSON.stringify({
            page,
            pageSize,
            options,
        }),
    })
}