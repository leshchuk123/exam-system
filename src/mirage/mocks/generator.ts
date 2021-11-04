import md5 from 'md5';
import { russianName } from 'russian_name';
import { v4 as uuidv4 } from "uuid";
import { LoremIpsum } from "lorem-ipsum";

import { iterate, pad, range, rnd, rndArrItem, translit } from "../../helpers";
import { IDataOption, IDataTask, IDataUser } from '../../interfaces/data';
import { IDump, modes, names, specialities, users } from "./constants";

export const generateDump = () => {
    const lorem = new LoremIpsum();

    const uids: {[key:string]:string} = {}
    users.forEach(user => {
        const match = user.email?.match(/^[^@]+/);
        const login = match ? match[0] : "";
        if (login) {
            uids[`${user.email}:${md5(login)}`] = String(user.userUid);
        }
    });

    const tasks: IDataTask[] = range(1, 50, (i: number) => ({
        id: i + 1,
        text: `Задача ${i + 1}. ${lorem.generateSentences(1)}`,
        speciality: rnd(1, 3),
        grade: rnd(1, 16),
        mode: rnd(1, 3),
    }));

    const options: IDataOption[] = [];
    tasks.forEach(task => {
        const { id, mode } = task;
        if (mode === 1) {
            const times = rnd(3, 6);
            const correct = rnd(0, times - 1);
            iterate((i) => {
                options.push({
                    id: options.length + 1,
                    task: id,
                    text: `Опция ${i + 1}. ${lorem.generateSentences(1)}`,
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
                    text: `Опция ${i + 1}. ${lorem.generateSentences(1)}`,
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
    });

    const dump: IDump = {
        specialities,
        modes,
        users: [
            ...users,
            ...range(4, 35, (i: number) => {
                const name = russianName.one();
                name.name = rndArrItem(names[name.gender]);
                name.transliteration.name = translit(name.name);
                const login = `${name.transliteration.name}.${name.transliteration.surname}`.toLowerCase();
                const user: IDataUser = {
                    id: i,
                    userUid: uuidv4(),
                    firstName: name.name,
                    lastName: name.surname,
                    email: `${login}@realize.dev`,
                    speciality: rnd(1, 3),
                    grade: rnd(5, 10),
                    hiringDate: `${rnd(2017, 2020)}-${pad(rnd(1, 12))}-${pad(rnd(1, 28))}T21:00:00.000Z`,
                    accessDate: "",
                    roles: 1,
                }
                uids[`${user.email}:${md5(login)}`] = String(user.userUid);
                return user;
            })
        ],
        tasks,
        options,
    }
    localStorage.setItem("exams_dump", JSON.stringify(dump));
    localStorage.setItem("exams_uids", JSON.stringify(uids));
    return {dump, uids};
}