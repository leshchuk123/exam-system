import { rnd } from "./index";

export const shuffle = function<T>(arr: T[]): T[] {
    const res = [...arr];
    for (let i = res.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
        [res[i], res[j]] = [res[j], res[i]];
    }
    return res;
}
export const arrAddUnique = function<T>(arr: T[], v: T): T[] {
    const set = new Set(arr);
    set.add(v);
    return [...set];
}
export const arrRemove = function <T>(arr: T[], v: T): T[] {
    const set = new Set(arr);
    set.delete(v);
    return [...set];
};
export const arrSwitch = function <T>(arr: T[], v: T): T[] {
    const set = new Set(arr);
    if (set.has(v)) set.delete(v);
    else set.add(v);
    return [...set];
};
export const isIn = function <T>(arr: T[], v: T) {
    return arr.indexOf(v) !== -1;
}
export const flatten = function<T>(arr: (T | T[])[]): T[] {
    const res: T[] = [];
    arr.forEach(item => {
        if (item instanceof Array) res.push( ...flatten(item) );
        else res.push(item);
    })
    return res;
}
export const rndArrItem = function<T>(arr: T[]): T {
    return arr[rnd(0, arr.length - 1)];
}
export const rndArrSlice = function <T>(arr: T[], length: number): T[] {
    const res = [...arr];
    while (res.length > length) {
        res.splice(rnd(0, res.length - 1), 1);
    }
    return res;
};
export const mapToArray = function<T>(map: Map<number, T> = new Map()): T[] {
    const arr: T[] = [];
    map.forEach(entry => arr.push(entry));
    return arr;
}
// объединение в строку аргументов непустых строк
export const clearJoin = ( ...arr: string[] ): string => arr.filter(v => !!v).join(" ");
