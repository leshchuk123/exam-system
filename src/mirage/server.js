import { createServer, Model } from "miragejs"
import { rndArrSlice, shuffle } from "../helpers/array";
import { collectionToArray, sortCollection, slicePage, filterCollection, saveDumpToStorage } from "./mocks/helpers";
import { RELS } from "./mocks/constants";

export function makeServer({ environment = 'test' }) {
    return createServer({
        environment,

        models: {
            users: Model,
            tasks: Model,
            options: Model,
            modes: Model,
            speciality: Model,
            attempts: Model,
            answers: Model,
        },

        routes() {
            this.namespace = "api";

            this.post("/users/auth", (schema, request) => {
                const data = JSON.parse(request.requestBody);
                const { email, password } = data;
                const userUid = window.uids[`${email}:${password}`];
                const user = schema.users.findBy({ userUid });
                return user;
            });

            this.post("/users/signout", (schema, request) => {
                const data = JSON.parse(request.requestBody);
                // const {uid} = data;
                return true;
            });

            ["users", "tasks", "specialities", "modes", "attempts", "options", "answers"].forEach(name => {
                this.post(`/${name}`, (schema, request) => {
                    const collection = schema[name].all();
                    return process(collection, request.requestBody, schema)
                });

                this.get(`/${name}/:id`, (schema, request) => {
                    const { id } = request.params;
                    return schema[name].findBy({ id });
                });

                this.put(`/${name}`, (schema, request) => {
                    const data = JSON.parse(request.requestBody)
                    const collection = schema[name].all();
                    const newId = collection.models.length === 0 ? 1 :
                        collection.models.length === 1 ? 1 + collection.models[0].attrs.id :
                            1 + Number(collection.models.sort((a, b) => b.id - a.id)[0].attrs.id);
                    data.id = newId;
                    collection.update(data);
                    saveDumpToStorage(window.server.db.dump());
                    return data;
                });

                this.patch(`/${name}`, (schema, request) => {
                    const data = JSON.parse(request.requestBody)
                    const collection = schema[name].all();
                    collection.update(data);
                    saveDumpToStorage(window.server.db.dump());
                    return data;
                });

                this.delete(`/${name}/:id`, (schema, request) => {
                    const { id } = request.params;
                    const rec = schema[name].findBy({ id });
                    rec.destroy();
                    saveDumpToStorage(window.server.db.dump());
                    return true;
                });
            });

            this.get("/exam/:speciality/:grade", (schema, request) => {
                const { speciality, grade } = request.params;
                const tasks = shuffle(
                    rndArrSlice(
                        collectionToArray(
                            schema.tasks.all()
                                .filter(v =>
                                    v.speciality == speciality
                                    && v.grade == grade)
                        ), 10
                    )
                );
                tasks.forEach((task, i, arr) => {
                    task.options = shuffle(
                        collectionToArray(
                            schema.options.all()
                                .filter(v => v.task == task.id)
                        )
                    );
                    task.selected = [];
                });
                return tasks;
            });

            this.post("/history", (schema, request) => {
                const collection = schema.attempts.all();
                const attempts = process(collection, request.requestBody, schema);
                attempts.data.forEach(attempt => {
                    const attemptAnswersCollection = schema.answers.all()
                        .filter(v => v.attempt == attempt.id);
                    let attemptAnswers = collectionToArray(attemptAnswersCollection);
                    attemptAnswers.forEach(answer => { answer.attempt = null });
                    attemptAnswers = processRelations(
                        attemptAnswers, schema
                    );
                    const tasks = {};
                    attemptAnswers.forEach(
                        answer => {
                            const { task, option } = answer;
                            if (!tasks[task.id]) {
                                tasks[task.id] = { ...task, options: [option] };
                            } else {
                                tasks[task.id].options.push(option);
                            }
                        }
                    );
                    attempt.tasks = Object.values(tasks);
                })
                return attempts;
            });

            this.get("/tasks/:task/options", (schema, request) => {
                const { task } = request.params;
                const coll = schema.options.all()
                const filtered = coll.filter(v => v.attrs.task == task);
                return collectionToArray(filtered);
            });
        },
    });
}

export const processRelations = function(arr, schema) {
    arr.forEach((rec) => {
        Object.keys(rec).forEach(fld => {
            let val = rec[fld];
            if (!!RELS[fld] && !isNaN(val) && val !== null) {
                val = processRelations([schema[RELS[fld]].findBy({ id: val })?.attrs], schema)[0];
                rec[fld] = val;
            }
        });
    });
    arr.forEach((v) => { v.id = Number(v.id) });
    return arr;
}
export const process = (collection, requestBody, schema) => {
    let { page = 1, pageSize = 20, options = {} } = JSON.parse(requestBody);
    const { sort = null, filter } = options;
    // преобразование коллекции в массив
    let arr = collectionToArray(collection).filter(v => v.id > 0);
    // обработка внешних ключей
    arr = processRelations(arr, schema);
    // сортиовка и фильтрация
    if (sort) arr = sortCollection(arr, sort);
    arr = filterCollection(arr, filter);
    // сохранение общего количества после фильтрации
    const total = arr.length;
    // корректировка страницы, чтобы она не превышала максимально
    // возможное количество для данного количества записей
    page = Math.min(
        page,
        Math.floor(total / pageSize) + (total % pageSize > 0 ? 1 : 0)
    );
    // выделение массива записей страницы
    const data = slicePage(arr, page, pageSize);
    return { page, total, pageSize, data, sort, filter };
};
