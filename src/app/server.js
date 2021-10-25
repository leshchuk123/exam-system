import { createServer, Model } from "miragejs"
import Mocks from "../mocks/mocks";
import { userSlice } from "./reducers/user";
// import { monitorEventLoopDelay } from "perf_hooks";

const userUids = {
    "andrey.leshchuk.123@gmail.com:E8k5jK3KDAFfhZn": "a9c0a48e-8dc1-4bbe-aea0-d5973a118e9a",
}
export function makeServer({ environment = 'test' }) {
    const mocks = new Mocks();

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
                // console.log({schema, request})
                const data = JSON.parse(request.requestBody);
                const {email, password} = data;
                const userUid = userUids[`${email}:${password}`];
                const user = schema.users.findBy({userUid});
                return user;
            });

            this.get("/users/:someid", (schema, request) => {
                const { id } = request.params;
                return schema.users.get()
            })
        },
    });
}
