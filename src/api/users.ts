import { IDataTask, IDataUser } from "../interfaces/data";

const defaults = {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
};

export const users = {
    auth: (email: string, password: string) => fetch("/api/users/auth", {
        ...defaults,
        method: "POST",
        body: JSON.stringify({
            email,
            password
        }),
    }),
    list: () => fetch("/api/users", {
        ...defaults,
    }),
    get: (id: string | number) => fetch(`/api/users/${id}`, {
        ...defaults,
    }),
    set: (data: IDataUser) => fetch(`/api/users/${data.id}`, {
        ...defaults,
        method: "POST",
        body: JSON.stringify(data)
    }),
}

interface ITasksOptions {
    speciality?: number
    grade?: number
}
export const tasks = {
    list: (options: ITasksOptions = {}) => {
        const { speciality, grade } = options;
        return fetch(
            `/api/tasks${speciality ? "/speciality/" + speciality : ""}${grade ? "/grade/" + grade : ""}`,
            { ...defaults }
        );
    },
    get: (id: string | number) => fetch(`/api/tasks/${id}`, {
        ...defaults,
    }),
    set: (data: IDataTask) => fetch(`/api/tasks/${data.id}`, {
        ...defaults,
        method: "POST",
        body: JSON.stringify(data)
    }),
}
