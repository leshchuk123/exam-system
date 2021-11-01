import * as IData from "../../interfaces/data";

import { dump, IDump } from "./constants";
import { mapToArray } from "../../helpers";

export default class Mocks {
    public users: Map<number, IData.IDataUser>;
    public modes: Map<number, IData.IDataMode>;
    public specialities: Map<number, IData.IDataSpeciality>;
    public tasks: Map<number, IData.IDataTask>;
    public options: Map<number, IData.IDataOption>;
    public attempts: Map<number, IData.IDataAttempt>;
    public answers: Map<number, IData.IDataAnswer>;

    private dump: IDump

    constructor() {
        this.dump = this.loadDump();
        const {
            users, 
            modes, 
            specialities, 
            tasks, 
            options,
            attempts,
            answers,
        } = this.dump;

        this.users = new Map();
        users.forEach(entry => {this.users.set(Number(Number(entry.id)), entry)});
        this.modes = new Map();
        modes?.forEach(entry => {this.modes.set(Number(entry.id), entry)});
        this.specialities = new Map();
        specialities?.forEach(entry => {this.specialities.set(Number(entry.id), entry)});
        this.tasks = new Map();
        tasks?.forEach(entry => {this.tasks.set(Number(entry.id), entry)});
        this.options = new Map();
        options?.forEach(entry => {this.options.set(Number(entry.id), entry)});
        this.attempts = new Map();
        attempts?.forEach(entry => {this.attempts.set(Number(entry.id), entry)});
        this.answers = new Map();
        answers?.forEach(entry => {this.answers.set(Number(entry.id), entry)});
    }

    private loadDump() {
        const stored = localStorage.getItem("exams:dump");
        const data: IDump = stored ? JSON.parse(stored) : dump;
        return data;
    }
    private assembleDump() {
        this.dump = {
            users: mapToArray(this.users),
            modes: mapToArray(this.modes),
            specialities: mapToArray(this.specialities),
            tasks: mapToArray(this.tasks),
            options: mapToArray(this.options),
            attempts: mapToArray(this.attempts),
            answers: mapToArray(this.answers),
        }
    }
    private saveDump() {
        localStorage.setItem("", JSON.stringify(this.dump));
    }

    public getUserByUid(uid: string): IData.IDataUser | null {
        let user: IData.IDataUser | null = null;
        this.users.forEach(entry => {
            if (entry.userUid === uid) user = entry;
        })
        return user;
    }
}
// const TUsers = new Map<number, IData.IDataUser>();
// const TSpeciality = new Map<number, IData.IDataSpeciality>();
// const TModes = new Map<number, IData.IDataMode>();
// const TTasks = new Map<number, IData.IDataTask>();

// TUsers.set(1, {
//     id: 1,
//     userUid: "1",
//     firstName: "Андрей",
//     lastName: "Лещук",
//     speciality: 1,
//     grade: 16,
//     hiringDate: "2020-12-23T21:00:00.000Z",
//     accessDate: "2021-10-22T21:00:00.000Z",
// });
// TUsers.set(2, {
//     id: 2,
//     userUid: "2",
//     firstName: "Антон",
//     lastName: "Голубков",
//     speciality: 1,
//     grade: 16,
//     hiringDate: "2018-08-12T21:00:00.000Z",
//     accessDate: "2021-10-22T21:00:00.000Z",
// });
// TUsers.set(3, {
//     id: 3,
//     userUid: "3",
//     firstName: "Иван",
//     lastName: "Зимин",
//     speciality: 2,
//     grade: 16,
//     hiringDate: "2019-03-01T21:00:00.000Z",
//     accessDate: "2021-10-22T21:00:00.000Z",
// });

// TSpeciality.set(1, {id: 1, name: "Фронтэнд разработка"});
// TSpeciality.set(2, {id: 2, name: "Бекэнд разработка"});
// TSpeciality.set(3, {id: 3, name: "Тестирование"});

// TModes.set(1, {id: 1, name: "Одиночный выбор",});
// TModes.set(2, {id: 2, name: "Множественный выбор",});
// TModes.set(3, {id: 3, name: "Ввод ответа",});

// TTasks.set(1, {
//     id: 1,
//     speciality: 1,
//     grade: 1,
//     mode: 1,
//     text: "",

// })
// export { TUsers, TSpeciality, TModes };

