import { createServer, Model } from "miragejs"
import { plural } from "../helpers";
import { collectionToArray, sortCollection, slicePage } from "./mocks/helpers";

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

            this.get("/users/:id", (schema, request) => {
                const { id } = request.params;
                return schema.users.find(id);
            });

            this.post("/users", (schema, request) => {
                let users = schema.users.all();
                return process(users, request.requestBody, schema);
            });

            this.post("/tasks", (schema, request) => {
                let tasks = schema.tasks.all();
                return process(tasks, request.requestBody, schema);
            });
        },
    });
}
export const processAssociations = function(arr, schema) {
    const cache = new Map();
    arr.forEach((rec) => {
        Object.keys(rec).forEach(fld => {
            const coll = schema[plural(fld)];
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
    const { sort = null, filter = [] } = options;
    let arr = collectionToArray(collection);
    if (sort) arr = sortCollection(arr, sort);
    processAssociations(arr, schema);
    const total = arr.length;
    const data = slicePage(arr, page, pageSize);
    return { page, total, pageSize, data, sort, filter };
}
