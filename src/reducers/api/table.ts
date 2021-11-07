import { IListOptions } from "../../interfaces/data";

const defaults: RequestInit = {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
};

// постраничное получение данных из указанной таблицы с опцинальной сортировкой и фильтрацией
export const list = function (table: string, page: number, pageSize: number, options: IListOptions) {
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
// получение записи по идентификатору из указанной таблицы
export const get = function(table: string, id: number) {
    return fetch(`/api/${table}/${id}`, {
        ...defaults,
    });
}
// добавление записи в указанную таблицу
export const add = function<T>(table: string, data: T) {
    return fetch(`/api/${table}`, {
        ...defaults,
        method: "PUT",
        body: JSON.stringify(data)
    });
}
// обновление записи в укзанной таблице
export const update = function<T>(table: string, data: T) {
    return fetch(`/api/${table}`, {
        ...defaults,
        method: "PATCH",
        body: JSON.stringify(data)
    });
}
// удаление записи из указанной таблицы
export const del = function (table: string, id: number) {
    return fetch(`/api/${table}/${id}`, {
        ...defaults,
        method: "DELETE",
    });
};
