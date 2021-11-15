import { defaults } from "./table";

export const getTaskOptions = (task: number) => {
    return fetch(`/api/tasks/${task}/options`, {
        ...defaults,
    });
}
