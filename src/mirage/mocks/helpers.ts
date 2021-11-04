import { AnyObject } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import { Collection } from "miragejs";
import { DataTableFilterParams, DataTableSortParams } from 'primereact/datatable';
import { makeServer } from "../server";
import { IDump } from "../mocks/constants";
import { generateDump } from '../mocks/generator';

export const createServer = () => {
    window.server = makeServer({ environment: "development" });
    let { dump, uids } = fetchDumpFromStorage();
    if (!dump || !uids) {
        const newDump = generateDump();
        dump = newDump.dump;
        uids = newDump.uids;
        saveDumpToStorage(dump,uids)
    }
    window.server.db.loadData(dump);
    window.uids = uids;
};

export const fetchDumpFromStorage = ():{dump: IDump, uids: { [key: string]: string }} => {
    const dump = localStorage.getItem("exams_dump");
    const uids = localStorage.getItem("exams_uids");
    return {
        dump: dump ? JSON.parse(dump) : null,
        uids: uids ? JSON.parse(uids) : null,
    }
};
export const saveDumpToStorage = (dump: IDump, uids: { [key: string]: string } | null = null) => {
    localStorage.setItem("exams_dump", JSON.stringify(dump));
    if (!!uids) localStorage.setItem("exams_uids", JSON.stringify(uids));
}

export const collectionToArray = function<T>(coll:Collection<any>) {
    const arr: T[] = [];
    coll.models.forEach((m) => arr.push(m.attrs as T));
    return arr;
};
export const filterCollection = function <T>(arrColl: T[], filter: DataTableFilterParams | null = null) {
    // filter.forEach((flt) => {
    //     const { field, value } = flt;
    //     arrColl = arrColl.filter(v => v[field] === value);
    // });;
    return arrColl;
};
export const sortCollection = function <T>(arrColl: T[], sort: DataTableSortParams | null = null) {
    const { sortField, sortOrder = 1 } = sort || {};
    if (sortField) {
        arrColl.sort((a: AnyObject, b: AnyObject) => {
            let v1: string, v2: string;
            if (sortField.indexOf("&") !== -1) {
                const arrFields = sortField.split(/\&/g);
                v1 = arrFields.map(f => String(a[f])).join(" ");
                v2 = arrFields.map(f => String(b[f])).join(" ");
            } else {
                v1 = a[sortField];
                v2 = b[sortField];
            }
            const res = v1 > v2 ? 1 : v1 < v2 ? -1 : 0;
            return res * Number(sortOrder);
        });
    }
    return arrColl;
};
export const slicePage = function <T>(arr: T[] = [], page = 1, pageSize = 10) {
    return arr.slice(pageSize * (page - 1), pageSize * page);
};
