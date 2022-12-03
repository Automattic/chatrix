/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_HOMESERVER: string
    readonly VITE_ROOM_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare module "@matrix-org/olm/olm.js?url";
declare module "@matrix-org/olm/olm.wasm?url";
declare module "@matrix-org/olm/olm_legacy.js?url";
declare module "hydrogen-web/src/platform/web/assets/download-sandbox.html?url";
declare module "hydrogen-web/src/platform/web/worker/main.js?url";
