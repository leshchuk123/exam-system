import { IDataTask, IListOptions } from "../../interfaces/data";

const defaults = {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
};

export const tasks = {
    list: (page:number, pageSize:number, options:IListOptions) => {
        return fetch(`/api/tasks`, {
            ...defaults,
            method: "POST",
            body: JSON.stringify({
                page,
                pageSize,
                options,
            }),
        })
    },
    get: (id: string | number) => fetch(`/api/tasks/${id}`, {
        ...defaults,
    }),
    add: (data: IDataTask) => fetch(`/api/tasks`, {
        ...defaults,
        method: "UPDATE",
        body: JSON.stringify(data)
    }),
    update: (data: IDataTask) => fetch(`/api/tasks`, {
        ...defaults,
        method: "PATCH",
        body: JSON.stringify(data)
    }),
    delete: (id: string | number) => fetch(`/api/tasks/${id}`, {
        ...defaults,
        method: "DELETE",
    }),
};
