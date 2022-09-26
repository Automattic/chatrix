import downloadSandboxPath from "hydrogen-view-sdk/download-sandbox.html?url";
import workerPath from "hydrogen-view-sdk/main.js?url";
import olmWasmPath from "@matrix-org/olm/olm.wasm?url";
import olmJsPath from "@matrix-org/olm/olm.js?url";
import olmLegacyJsPath from "@matrix-org/olm/olm_legacy.js?url";
import { createNavigation, createRouter, Platform } from "hydrogen-view-sdk";
import { RootViewModel } from "./viewmodels/RootViewModel";
import { RootView } from "./views/RootView";

const assetPaths = {
    downloadSandbox: downloadSandboxPath,
    worker: workerPath,
    olm: {
        wasm: olmWasmPath,
        legacyBundle: olmLegacyJsPath,
        wasmBundle: olmJsPath,
    },
};

export async function main(rootDivId: string) {
    const root = document.querySelector(`#${rootDivId}`) as HTMLDivElement;
    if (!root) {
        throw new Error(`Element with id #${rootDivId} not found.`);
    }

    root.className = "hydrogen";
    const platform = new Platform({ container: root, assetPaths });
    const navigation = createNavigation();
    platform.setNavigation(navigation);

    const urlRouter = createRouter({ navigation, history: platform.history });
    urlRouter.attach();

    const rootViewModel = new RootViewModel({ platform, navigation, urlCreator: urlRouter });
    rootViewModel.start();

    const rootView = new RootView(rootViewModel);
    root.appendChild(rootView.mount());
}
