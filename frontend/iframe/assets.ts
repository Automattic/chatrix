import olmJsPath from "@matrix-org/olm/olm.js?url";
import olmWasmPath from "@matrix-org/olm/olm.wasm?url";
import olmLegacyJsPath from "@matrix-org/olm/olm_legacy.js?url";
import downloadSandboxPath from "hydrogen-web/src/platform/web/assets/download-sandbox.html?url";
import workerPath from "hydrogen-web/src/platform/workers/olm/main.js?url";

const paths = {
    downloadSandbox: downloadSandboxPath,
    worker: workerPath,
    olm: {
        wasm: olmWasmPath,
        legacyBundle: olmLegacyJsPath,
        wasmBundle: olmJsPath,
    },
};

if (import.meta.env.PROD) {
    paths["serviceWorker"] = "sw.js";
}

export default paths;
