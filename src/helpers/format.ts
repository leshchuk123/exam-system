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
