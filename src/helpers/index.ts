import { KeyboardEvent } from "react";

export const isOK = (res: Response) => res.status === 200 || res.status === 201;

// получение символа нажатой клавиши
export const eventKey = (e: KeyboardEvent) => {
    if (e.key) return e.key;
    return String.fromCharCode(e.which || e.keyCode);
};

// получение случайного целого числа в заданном диапазоне (границы включаются)
export const rnd = (from = 1, to = 10) => Math.floor(Math.random() * (to - from + 1)) + from;

// получение массива размерности (to - from + 1), заполненного числами от from до to
// или значениями value (если value - функция, то результатом ее выполнения)
export const range = (from = 1, to = 10, value: any = undefined): any[] => {
    const rng = [];
    for (let i = from; i <= to; i++) {
        const v = typeof value === "function" ? value.call(null, i) :
            value !== undefined ? value : i;
        rng.push(v);
    }
    return rng;
}

// итеративный вызов times раз функции callback с первым аргументом - счетчиком i и аргументами args
export const iterate = (
    callback: (i: number, ...args: any[]) => any,
    times: number = 1,
    ...args: any[]
): void => {
    for (let i = 0; i < times; i++) {
        callback(i, ...args);
    }
}

export const num2bits = (n: number) => n.toString(2).split("").reverse().map((v, i) => v === "1" ? Math.pow(2, i) : 0).filter(v => !!v);

export const comparator = (v1: any, v2: any, strict = true): boolean => {
    if (v1 === undefined || v1 === null) return v1 === v2;
    if (v2 === undefined || v2 === null) return v1 === v2;
    const type1 = typeof v1;
    const type2 = typeof v2;
    if (type1 !== type2) return false;
    if (type1 !== "object" || strict === true) return v1 === v2;
    if (v1 instanceof Array) return v1.length === v2.length
        && v1.filter((v, i) => !comparator(v, v2[i], strict)).length > 0;
    if (v1 instanceof Map) {
        if (v1.size !== (v2 as Map<any, any>).size) return false;
        let res = true;
        (v1 as Map<any, any>).forEach(
            (val, key) => {
                res = res && comparator((v2 as Map<any, any>).get(key), val, strict);
            }
        );
        return res;
    }
    if (v1 instanceof Set) {
        if (v1.size !== (v2 as Set<any>).size) return false;
        let res = true;
        (v1 as Set<any>).forEach(
            (val) => {
                res = res && (v2 as Set<any>).has(val);
            }
        );
        return res;
    }
    if (v1 instanceof Object) {
        const keys1 = Object.keys(v1);
        const keys2 = Object.keys(v2 as Object);
        if (keys1.length !== keys2.length) return false;
        let res = true;
        keys1.forEach(key => {
            res = res && comparator(v1[key], v2[key], strict);
        })
        return res;
    }
    return false;
};
