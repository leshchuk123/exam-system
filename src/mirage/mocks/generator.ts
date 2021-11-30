import md5 from 'md5';
import { russianName } from 'russian_name';
import { v4 as uuidv4 } from "uuid";
import { LoremIpsum } from "lorem-ipsum";

import { iterate, range, rnd,  } from "../../helpers";
import { rndArrItem, shuffle } from "../../helpers/array";
import { pad, translit } from "../../helpers/format";
import { IDataOption, IDataTask, IDataUser } from '../../interfaces/data';
import { IDump, modes, names, specialities, devUsers, attempts, answers } from "./constants";

export const generateDump = () => {
    const lorem = new LoremIpsum();

    const uids: {[key:string]:string} = {}
    devUsers.forEach(user => {
        const match = user.email?.match(/^[^@]+/);
        const login = match ? match[0] : "";
        if (login) {
            uids[`${user.email}:${md5(login)}`] = String(user.userUid);
        }
    });

    let tasks: IDataTask[] = [];

    const taskGenerator = function* () {
        let id = 0;
        while (true) {
            yield {
                id: ++id,
                text: `Задача ${id}. ${lorem.generateSentences(1)}`,
                mode: rnd(1, 2),
            };
        }
    };
    const gen = taskGenerator();

    // генерация заданий: для грейдов с 8 по 16 и для всех трех специальностей
    for (let grade = 8; grade < 17; grade++) {
        for (let speciality = 2; speciality < 5; speciality++) {
            tasks = tasks.concat(range(1, rnd(15, 25), () => ({
                ...gen.next().value, speciality, grade
            })));
        }
    }
    // перемешивание заданий в случайном порядке и переназначение идентификаторов
    tasks = shuffle(tasks);
    tasks.forEach((task, i) => { task.id = (i + 1) });

    const options: IDataOption[] = [];
    // генерация вариантов ответов к заданиям
    tasks.forEach(task => {
        const { id, mode } = task;
        // для вопросов с единственным ответом
        if (mode === 1) {
            // количество вариантов ответов
            const times = rnd(3, 6);
            // выбор правильного ответа
            const correct = rnd(0, times - 1);
            iterate((i) => {
                options.push({
                    id: options.length + 1,
                    task: id,
                    text: `Опция ${i + 1}. ${i === correct ? "Правильный. " : ""}${lorem.generateSentences(1)}`,
                    correct: i === correct,
                })
            }, times);
        // для вопросов с множественными ответами
        } else if (mode === 2) {
            // количество вариантов ответов
            const times = rnd(3, 6);
            // массив [0, 1, 2, ... (times - 1)]
            const correct = range(0, times - 1);
            // количество правильных ответов
            const correctCount = rnd(1, times);
            // удаление из массива correct произвольных элементов
            while (correct.length > correctCount) {
                correct.splice(rnd(0, correct.length - 1), 1);
            }
            iterate((i) => {
                options.push({
                    id: options.length + 1,
                    task: id,
                    text: `Опция ${i + 1}. ${correct.indexOf(i) !== -1 ? "Правильный. " : ""}${lorem.generateSentences(1)}`,
                    correct: correct.indexOf(i) !== -1,
                })
            }, times);
        } else if (mode === 3) {
            options.push({
                id: options.length + 1,
                task: id,
                regEx: lorem.generateWords(rnd(1, 3))
            });
        }
    });

    const dump: IDump = {
        specialities,
        modes,
        users: [
            ...devUsers,
            ...range(4, 35, (i: number) => {
                const name = russianName.one();
                name.name = rndArrItem(names[name.gender]);
                name.transliteration.name = translit(name.name);
                const login = `${name.transliteration.name}.${name.transliteration.surname}`.toLowerCase();
                const user: IDataUser = {
                    id: i,
                    userUid: uuidv4(),
                    name: name.name,
                    surname: name.surname,
                    email: `${login}@realize.dev`,
                    speciality: rnd(2, 4),
                    grade: rnd(8, 16),
                    hiringDate: `${rnd(2017, 2020)}-${pad(rnd(1, 12))}-${pad(rnd(1, 28))}T21:00:00.000Z`,
                    accessDate: `2021-${pad(rnd(5, 10))}-${pad(rnd(1, 28))}T21:00:00.000Z`,
                    roles: 1,
                }
                uids[`${user.email}:${md5(login)}`] = String(user.userUid);
                return user;
            })
        ],
        tasks,
        options,
        attempts,
        answers,
    }
    return {dump, uids};
}