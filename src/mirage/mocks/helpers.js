import { SORT_DIR } from "../../constants/data";

export const collectionToArray = (coll)  => {
    const arr = [];
    coll.models.forEach(m => arr.push(m.attrs));
    return arr;
}
export const filterCollection = (coll, filters = []) => {
    filters.forEach((flt) => {
        const { field, value } = flt;
        coll = coll.filter(v => v[field] === value);
    });
    return coll;
}
export const sortCollection = (coll, sort = []) => {
    sort.forEach(srt => {
        const { field, dir = SORT_DIR.ASC } = srt;
        coll.sort((a, b) => {
            const v1 = a[field];
            const v2 = b[field];
            const res = v1 > v2 ? 1 : v1 < v2 ? -1 : 0;
            return res * (dir === SORT_DIR.ASC ? 1 : -1);
        });
    });
    return coll;
}
export const slicePage = (arr = [], page = 1, pageSize = 10) => {
    return arr.slice(pageSize * (page - 1), pageSize * page);
}