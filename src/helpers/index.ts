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

export const GRADES = range(1, 16, (i: number) => ({ value: i, text: `${i} грейд` }));

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

export const isEqual = (v1: any, v2: any, strict = true): boolean => {
    // case 1: проверка на undefined или null
    // если любой из аргументов имеет значение undefined или null
    // то возвращается строгое равенство
    if (
        v1 === undefined ||
        v1 === null ||
        v2 === undefined ||
        v2 === null
    ) return v1 === v2;

    // case 2: проверка соответсвия типов по typeof
    // если типы неравны, то сразу возвращается false
    const type1 = typeof v1;
    const type2 = typeof v2;
    if (type1 !== type2) return false;

    // case 3: проверка примитивных типов, символов и функций
    // для примитивных типов, символов и функций возвращается
    // строгое равенство аргументов
    switch (type1) {
        case "string":
        case "number":
        case "bigint":
        case "boolean":
        case "symbol":
        case "function":
            return v1 === v2;
    }
    // case 4: проверка на равенство массивов
    if (v1 instanceof Array) {
        // если второй аргумент не является массивом
        // или длина массивов разная, то результат - false
        if (!(v2 instanceof Array)) return false;
        if (v1.length !== v2.length) return false;
        // если оба аргумента - один и тот же объект,
        // то результат true
        if (v1 === v2) return true;
        // в режиме strict каждый элемент первого массива
        // должен быть равен соответствующему элементу второго
        if (strict) return v1.filter((v, i) => !isEqual(v, v2[i], strict)).length === 0;
        // иначе сравниваются элементы отсортированных массивов
        else {
            const arr1 = [...v1].sort();
            const arr2 = [...v2].sort();
            return arr1.filter((v, i) => !isEqual(v, arr2[i], strict)).length === 0;
        }
    }
    // case 5: проверка на равенство сетов
    if (v1 instanceof Set) {
        // если второй аргумент не является сетом
        // или длина сетов разная, то результат - false
        if (!(v2 instanceof Set)) return false;
        if (v1.size !== (v2 as Set<any>).size) return false;
        // если оба аргумента - один и тот же объект,
        // то результат true
        if (v1 === v2) return true;
        // иначе оба сета преобразуются в массивы и сравниваются
        return isEqual([...v1], [...v2], strict);
    }
    // case 6: проверка на равенство мапов
    if (v1 instanceof Map) {
        // если второй аргумент не является сетом
        // или длина сетов разная, то результат - false
        if (!(v2 instanceof Map)) return false;
        if (v1.size !== (v2 as Map<any, any>).size) return false;
        // если оба аргумента - один и тот же объект,
        // то результат true
        if (v1 === v2) return true;
        // иначе оба сета преобразуются в массивы и сравниваются
        return isEqual(Object.fromEntries(v1), Object.fromEntries(v2), strict)
    }
    // case 7: проверка на равенство объектов
    return Object.keys(v1).filter(key => !isEqual(v1[key], v2[key], strict)).length === 0;
};

export const getId = (data: any) => {
    if (typeof data === "object") return data.id;
    return data;
}
