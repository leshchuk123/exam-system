import { createServer, Model } from "miragejs"
import { rndArrSlice, shuffle } from "../helpers";
import { collectionToArray, sortCollection, slicePage, filterCollection, saveDumpToStorage } from "./mocks/helpers";
const pluralize = require('pluralize')

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
                const {email, password} = data;
                const userUid = window.uids[`${email}:${password}`];
                const user = schema.users.findBy({userUid});
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
                    const newId = 1 + Number(collection.models.sort((a, b) => b.id - a.id)[0].attrs.id);
                    data.id = newId;
                    collection.update(data);
                    saveDumpToStorage(window.server.db.dump());
                    return true;
                });

                this.patch(`/${name}`, (schema, request) => {
                    const data = JSON.parse(request.requestBody)
                    const collection = schema[name].all();
                    collection.update(data);
                    saveDumpToStorage(window.server.db.dump());
                    return true;
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
            })
        },
    });
}

export const processAssociations = function(arr, schema) {
    const cache = new Map();
    arr.forEach((rec) => {
        Object.keys(rec).forEach(fld => {
            const coll = schema[pluralize.plural(fld)];
            const val = rec[fld];
            if (coll) {
                if (!cache.has(fld)) cache.set(fld, new Map());
                if (!cache.get(fld).has(val)) cache.get(fld).set(val, coll.findBy({ id: val }));
                rec[fld] = cache.get(fld).get(val).attrs;
            }
        });
    });
}
export const process = (collection, requestBody, schema) => {
    let { page = 1, pageSize = 20, options = {} } = JSON.parse(requestBody);
    const { sort = null, filter } = options;
    let arr = collectionToArray(collection);
    if (sort) arr = sortCollection(arr, sort);
    arr = filterCollection(arr, filter);
    processAssociations(arr, schema);
    const total = arr.length;
    while (pageSize * (page - 1) >= total) page--;
    const data = slicePage(arr, page, pageSize);
    data.forEach((v) => { v.id = Number(v.id) });
    return { page, total, pageSize, data, sort, filter };
};
