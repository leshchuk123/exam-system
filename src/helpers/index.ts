import { Objectish } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
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
