import { IListOptions } from "../../interfaces/data";

const defaults: RequestInit = {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
};

export const list = function(table: string, page:number, pageSize:number, options:IListOptions) {
    return fetch(`/api/${table}`, {
        ...defaults,
        method: "POST",
        body: JSON.stringify({
            page,
            pageSize,
            options,
        }),
    });
};
export const get = function(table: string, id: number) {
    return fetch(`/api/${table}/${id}`, {
        ...defaults,
    });
}
export const add = function<T>(table: string, data: T) {
    return fetch(`/api/${table}`, {
        ...defaults,
        method: "UPDATE",
        body: JSON.stringify(data)
    });
}
export const update = function<T>(table: string, data: T) {
    return fetch(`/api/${table}`, {
        ...defaults,
        method: "PATCH",
        body: JSON.stringify(data)
    });
}
export const del = function (table: string, id: number) {
    return fetch(`/api/${table}/${id}`, {
        ...defaults,
        method: "DELETE",
    });
};
