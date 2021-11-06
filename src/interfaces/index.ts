import { Server } from "miragejs";

declare global {
    interface Window {
        uids: { [key: string]: string }
        server: Server
        confirm: (message?: string | undefined) => boolean
    }
}

export interface IVoidFunc {
    (): void
}
