/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_HOMESERVER: string
    readonly VITE_ROOM_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
