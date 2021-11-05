import { createServer, Model } from "miragejs"
import { collectionToArray, sortCollection, slicePage, filterCollection } from "./mocks/helpers";
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

            this.get("/users/:uid/history", (schema, request) => {
                const { uid } = request.params;
                const user = schema.users.findBy({ userUid: uid });
                debugger
                return [];
            });

            this.post("/users/signout", (schema, request) => {
                const data = JSON.parse(request.requestBody);
                // const {uid} = data;
                return true;
            });

            this.get("/users/:uid", (schema, request) => {
                const { uid } = request.params;
                return schema.users.findBy({ userUid: uid });
            });

            this.post("/users", (schema, request) => {
                let users = schema.users.all();
                return process(users, request.requestBody, schema);
            });

            this.post("/tasks", (schema, request) => {
                let tasks = schema.tasks.all();
                return process(tasks, request.requestBody, schema);
            });

            this.post("/attempts", (schema, request) => {
                let attempts = schema.attempts.all();
                return process(attempts, request.requestBody, schema);
            });

            this.post("/specialities", (schema, request) => {
                let specialities = schema.specialities.all();
                return process(specialities, request.requestBody, schema);
            });
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
    const { page = 1, options = {}, pageSize = 20 } = JSON.parse(requestBody);
    const { sort = null, filter } = options;
    let arr = collectionToArray(collection);
    if (sort) arr = sortCollection(arr, sort);
    arr = filterCollection(arr, filter);
    processAssociations(arr, schema);
    const total = arr.length;
    const data = slicePage(arr, page, pageSize);
    data.forEach((v) => { v.id = Number(v.id) });
    return { page, total, pageSize, data, sort, filter };
};
