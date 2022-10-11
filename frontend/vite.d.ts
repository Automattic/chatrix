/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_HOMESERVER: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
