import { Server } from "miragejs";

declare global {
    interface Window {
        uids: { [key: string]: string }
        server: Server
    }
}

export interface IVoidFunc {
    (): void
}
