import { IDataUser, IListOptions } from "../interfaces/data";

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
    list: (page = 1, pageSize = 20, options: IListOptions = {}) => {
        return fetch(`/api/users`, {
            ...defaults,
            method: "POST",
            body: JSON.stringify({
                page,
                pageSize,
                options,
            }),
        })
    },
    get: (id: string | number) => fetch(`/api/users/${id}`, {
        ...defaults,
    }),
    add: (data: IDataUser) => fetch(`/api/users`, {
        ...defaults,
        method: "UPDATE",
        body: JSON.stringify(data)
    }),
    update: (data: IDataUser) => fetch(`/api/users`, {
        ...defaults,
        method: "PATCH",
        body: JSON.stringify(data)
    }),
    delete: (id: string | number) => fetch(`/api/users/${id}`, {
        ...defaults,
        method: "DELETE",
    }),
};
