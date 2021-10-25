import * as IData from "../interfaces/data";
import { v4 as uuidv4 } from "uuid";
import { iterate, range, rnd, rndArrItem } from "../helpers";
import { lorem, users } from "./constants";

interface IDump {
    users: IData.IDataUser[]
    modes: IData.IDataMode[]
    specialities: IData.IDataSpeciality[]
    tasks: IData.IDataTask[]
    options: IData.IDataOption[]
    attempts?: IData.IDataAttempt[]
    answers?: IData.IDataAnswer[]
}
const tasks: IData.IDataTask[] = range(1, 50, (i: number) => ({
    id: i + 1,
    text: `Задача ${i + 1}. ${rndArrItem(lorem)}`,
    speciality: rnd(1, 3),
    grade: rnd(1, 16),
    mode: rnd(1, 3),
}));

const options: IData.IDataOption[] = [];
tasks.forEach(task => {
    const {id, mode} = task;
    if (mode === 1) {
        const times = rnd(3, 6);
        const correct = rnd(0, times - 1);
        iterate((i) => {
            options.push({
                id: options.length + 1,
                task: id,
                text: `Опция ${i + 1}. ${rndArrItem(lorem)}`,
                correct: i === correct,
            })
        }, times);
    } else if (mode === 2) {
        const times = rnd(3, 6);
        const correct = range(0, times - 1);
        const correctCount = rnd(1, times);
        while (correct.length > correctCount) {
            correct.splice(rnd(0, correct.length - 1), 1);
        }
        iterate((i) => {
            options.push({
                id: options.length + 1,
                task: id,
                text: `Опция ${i + 1}. ${rndArrItem(lorem)}`,
                correct: correct.indexOf(i) !== -1,
            })
        }, times);
    } else if (mode === 3) {
        options.push({
            id: options.length + 1,
            task: id,
            regEx: "\\d+"
        })
    }
})
export const dump = {
    modes: [
        {id: 1, name: "Одиночный выбор"},
        {id: 2, name: "Множественный выбор"},
        {id: 3, name: "Ввод ответа"},
    ],
    specialities: [
        {id: 1, name: "Фронтэнд разработка"},
        {id: 2, name: "Бекэнд разработка"},
        {id: 3, name: "Тестирование"},
    ],
    users: users.map((v, i) => {
        const a = v.split(/\s+/g)
        return {
            id: i + 1,
            userUid: uuidv4(),
            firstName: a[0],
            lastName: a[1],
            speciality: a[2],
            grade: a[3],
            hiringDate: new Date(a[4]).toISOString(),
        }
    }),
    tasks,
    options
}
