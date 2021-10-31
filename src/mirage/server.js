import { createServer, Model } from "miragejs"
import { SORT_DIR } from "../constants/data";
import { collectionToArray, filterCollection, slicePage, sortCollection } from "./mocks/helpers";

const userUids = {
    "andrey.leshchuk.123@gmail.com:17eb222afaec35f49fbc8eb4a45753ee": "a9c0a48e-8dc1-4bbe-aea0-d5973a118e9a",
}

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
                const userUid = userUids[`${email}:${password}`];
                const user = schema.users.findBy({userUid});
                return user;
            });

            this.get("/users/:id", (schema, request) => {
                const { id } = request.params;
                return schema.users.find(id);
            });

            this.post("/users", (schema, request) => {
                const { page = 1, options = {}, pageSize = 20 } = JSON.parse(request.requestBody);
                const { sort = null, filter = [] } = options;
                let users = schema.users.all();
                // users = filterCollection(users, filter);
                let arr = collectionToArray(users);
                if (sort) arr = sortCollection(arr, sort);
                const total = arr.length;
                const data = slicePage(arr, page, pageSize);
                return { page, total, pageSize, data, sort, filter };
            });
        },
    });
}
