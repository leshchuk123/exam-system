import { AnyObject } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import { Collection } from "miragejs";
import { DataTableFilterParams, DataTableSortParams } from 'primereact/datatable';
import { makeServer } from "../server";
import { IDump } from "../mocks/constants";
import { generateDump } from '../mocks/generator';

const pluralize = require('pluralize')

export const createServer = () => {
    window.server = makeServer({ environment: "development" });
    let { dump, uids } = fetchDumpFromStorage();
    if (!dump || !uids) {
        const newDump = generateDump();
        dump = newDump.dump;
        uids = newDump.uids;
        saveDumpToStorage(dump, uids);
    }
    window.server.db.loadData(dump);
    window.uids = uids;
};

export const fetchDumpFromStorage = ():{dump: IDump, uids: { [key: string]: string }} => {
    const dump = localStorage.getItem("exams:dump");
    const uids = localStorage.getItem("exams:uids");
    return {
        dump: dump ? JSON.parse(dump) : null,
        uids: uids ? JSON.parse(uids) : null,
    }
};
export const saveDumpToStorage = (dump: IDump, uids: { [key: string]: string } | null = null) => {
    localStorage.setItem("exams:dump", JSON.stringify(dump));
    if (!!uids) localStorage.setItem("exams:uids", JSON.stringify(uids));
}

export const collectionToArray = function<T>(coll:Collection<any>) {
    const arr: T[] = [];
    coll.models.forEach((m) => arr.push(m.attrs as T));
    return arr;
};
export const filterCollection = function <T>(arrColl: T[], filter: DataTableFilterParams ) {
    let arrRes = [...arrColl];
    for (let filterName in filter?.filters) {
        const { value, matchMode } = filter?.filters[filterName];
        if (matchMode === "contains" && !!value) {
            const val = String(value).toLowerCase();
            arrRes = arrRes.filter((rec) => {
                let recVal,match;
                if (filterName === "name") recVal = `${(rec as any).firstName} ${(rec as any).lastName}`;
                else if ((match = filterName.match(/^(.+)\.name$/))) recVal = `${(rec as any)[match[1]].firstName} ${(rec as any)[match[1]].lastName}`;
                else if ((match = filterName.match(/^(.+)\.(.+)$/))) recVal = `${(rec as any)[match[1]][match[2]]}`;
                else recVal = (rec as any)[filterName];
                return String(recVal).toLowerCase().indexOf(val) !== -1
            });
        }
        else if (matchMode === "in" && value instanceof Array && value.length > 0) {
            arrRes = arrRes.filter((v: any) => value.indexOf(v[pluralize.singular(filterName)]) !== -1);
        }
        else if (matchMode === "custom" && !!value) {
            if (filterName === "roles") {
                arrRes = arrRes.filter((v: any) => (Number(value) & Number(v.roles)) > 0);
            }
        }
    }
    return arrRes;
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
