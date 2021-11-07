import { KeyboardEvent } from "react";

const letters: { [key: string]: string } = {
    "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "yo",
    "ж": "zh", "з": "z", "и": "i", "й": "y", "к": "k", "л": "l", "м": "m",
    "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u",
    "ф": "f", "х": "kh", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "shch",
    "ъ": "", "ы": "y", "ь": "", "э": "e", "ю": "yu", "я": "ya",
};
export const translit = (str: string) => str.split("").map(ch => {
    if (!/[а-я]/i.test(ch)) return ch;
    let ch2 = letters[ch.toLowerCase()];
    if (/[А-Я]/.test(ch)) ch2 = ch2.substr(0, 1).toUpperCase() + ch.substr(1);
    return ch2;
}).join("");

// объединение в строку аргументов непустых строк
export const clearJoin = ( ...arr: string[] ): string => arr.filter(v => !!v).join(" ");

// получение символа нажатой клавиши
export const eventKey = (e: KeyboardEvent) => {
    if (e.key) return e.key;
    return String.fromCharCode(e.which || e.keyCode);
};

// получение случайного целого числа в заданном диапазоне (границы включаются)
export const rnd = (from = 1, to = 10) => Math.floor(Math.random() * (to - from + 1)) + from;

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
export const shuffle = function<T>(arr: T[]): T[] {
    const res = [...arr];
    for (let i = res.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

        // поменять элементы местами
        // мы используем для этого синтаксис "деструктурирующее присваивание"
        // подробнее о нём - в следующих главах
        // то же самое можно записать как:
        // let t = array[i]; array[i] = array[j]; array[j] = t
        [res[i], res[j]] = [res[j], res[i]];
    }
    return res;
}

export const pad = (v: number, length = 2) => {
    let res = String(v);
    while (res.length < length) res = "0" + res;
    return res;
}

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

export const mapToArray = function<T>(map: Map<number, T> = new Map()): T[] {
    const arr: T[] = [];
    map.forEach(entry => arr.push(entry));
    return arr;
}

export const errToStr = (error: Error | string) => {
    return error instanceof Error ? error.message : error;
}

export const dateFormater = (str?: string) => str && str.length ? new Date(str).toLocaleDateString() : "";

export const plural = (str: string) => {
    let match;
    if ((match = str.match(/^(.+)y$/))) return `${match[1]}ies`;
    if ((match = str.match(/^(.+)([cs])$/))) return `${match[1]}${match[2]}es`;
    return `${str}s`;
}
export const singular = (str: string) => {
    let match;
    if ((match=str.match(/^(.+)ies$/))) return `${match[1]}y`;
    if ((match = str.match(/^(.+)(es|s)$/))) return match[1];
    return str;
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