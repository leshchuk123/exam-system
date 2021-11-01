import { plural } from "../../helpers";

export const collectionToArray = (coll) => {
    const arr = [];
    coll.models.forEach(m => arr.push(m.attrs));
    return arr;
}
export const filterCollection = (arrColl, filter = []) => {
    filter.forEach((flt) => {
        const { field, value } = flt;
        arrColl = arrColl.filter(v => v[field] === value);
    });
    return arrColl;
}
export const sortCollection = (arrColl, sort = {}) => {
    const { sortField, sortOrder = 1 } = sort;
    if (sortField) {
        arrColl.sort((a, b) => {
            let v1, v2;
            if (sortField.indexOf("&") !== -1) {
                const arrFields = sortField.split(/\&/g);
                v1 = arrFields.map(f => String(a[f])).join(" ");
                v2 = arrFields.map(f => String(b[f])).join(" ");
            } else {
                v1 = a[sortField];
                v2 = b[sortField];
            }
            const res = v1 > v2 ? 1 : v1 < v2 ? -1 : 0;
            return res * sortOrder;
        });
    }
    return arrColl;
}
export const slicePage = (arr = [], page = 1, pageSize = 10) => {
    return arr.slice(pageSize * (page - 1), pageSize * page);
}
export const processAssociations = (arr, schema) => {
    const cache = new Map();
    arr.forEach(rec => {
        Object.keys(rec).forEach(fld => {
            const coll = schema[plural(fld)];
            const val = rec[fld];
            if (coll) {
                if (!cache.has(fld)) cache.set(fld, new Map());
                if (!cache.get(fld).has(val)) cache.get(fld).set(val, coll.findBy({ id: val }));
                rec[fld] = cache.get(fld).get(val).attrs;
            }
        });
    });
}
export const process = (collection, requestBody, schema) => {
    const { page = 1, options = {}, pageSize = 20 } = JSON.parse(requestBody);
    const { sort = null, filter = [] } = options;
    let arr = collectionToArray(collection);
    if (sort) arr = sortCollection(arr, sort);
    processAssociations(arr, schema);
    const total = arr.length;
    const data = slicePage(arr, page, pageSize);
    return { page, total, pageSize, data, sort, filter };
}
