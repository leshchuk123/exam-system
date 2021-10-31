import { KeyboardEvent } from "react";

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
export const iterate = (callback: (i: number, ...args: any[]) => any, times: number = 1, ...args: any[]): void => {
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