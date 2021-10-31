export const collectionToArray = (coll)  => {
    const arr = [];
    coll.models.forEach(m => arr.push(m.attrs));
    return arr;
}
export const filterCollection = (coll, filter = []) => {
    filter.forEach((flt) => {
        const { field, value } = flt;
        coll = coll.filter(v => v[field] === value);
    });
    return coll;
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