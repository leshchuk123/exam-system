export const errToStr = (error: Error | string) => {
    return error instanceof Error ? error.message : error;
}

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

export const pad = (v: number, length = 2) => {
    let res = String(v);
    while (res.length < length) res = "0" + res;
    return res;
}

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

export const dateFormater = (str?: string) => str && str.length ? new Date(str).toLocaleDateString() : "";

export const timeFormater = (num: number, short: boolean = false, milliseconds: boolean = false) => {
    let ms = num, seconds = 0, minutes = 0, hours = 0, days = 0;
    if (ms >= 1000) {
        seconds = Math.floor(ms / 1000);
        ms = ms % 1000;
        if (seconds >= 60) {
            minutes = Math.floor(seconds / 60);
            seconds = seconds % 60;
            if (minutes >= 60) {
                hours = Math.floor(minutes / 60);
                minutes = minutes % 60;
                if (hours >= 24) {
                    days = Math.floor(hours / 24);
                    hours = hours % 24;
                }
            }
        }
    }
    let res = `${pad(minutes)}:${pad(seconds)}`;
    if (milliseconds) res = `${res}:${pad(ms, 3)}`
    if (!short || days > 0) res = `${pad(hours)}:${res}`;
    if (days > 0) res = `${days} days ${res}`;
    return res;
};
