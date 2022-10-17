import olmJsPath from "@matrix-org/olm/olm.js?url";
import olmWasmPath from "@matrix-org/olm/olm.wasm?url";
import olmLegacyJsPath from "@matrix-org/olm/olm_legacy.js?url";
import downloadSandboxPath from "hydrogen-view-sdk/download-sandbox.html?url";
import workerPath from "hydrogen-view-sdk/main.js?url";
import { parseUrlPath, stringifyPath } from "hydrogen-web/src/domain/navigation";
import { NullLogger } from "hydrogen-web/src/logging/NullLogger";
import { ConfigFactory } from "./config/ConfigFactory";
import { createNavigation, Navigation } from "./platform/Navigation";
import { Platform } from "./platform/Platform";
import { URLRouter } from "./platform/URLRouter";
import { AppViewModelMaker } from "./viewmodels/AppViewModel";
import { RootViewModel } from "./viewmodels/RootViewModel";
import { AppViewMaker } from "./views/AppView";
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

export class Main {
    private readonly _platform: Platform;
    private readonly _navigation: Navigation;
    private readonly _router: URLRouter;
    private readonly _rootNode: HTMLDivElement;
    private _rootViewModel: RootViewModel | undefined;

    constructor(rootDivId: string) {
        this._rootNode = document.querySelector(`#${rootDivId}`) as HTMLDivElement;
        if (!this._rootNode) {
            throw new Error(`Element with id #${rootDivId} not found.`);
        }
        this._rootNode.className = "hydrogen";

        this._platform = new Platform({
            container: this._rootNode,
            assetPaths,
            config: {
                bugReportEndpointUrl: null,
                ...ConfigFactory.fromQueryParams(),
            },
        });

        this._navigation = createNavigation();

        this._router = new URLRouter(this._platform.history, this._navigation, parseUrlPath, stringifyPath);
        this._router.attach();
    }

    public async start(appViewModelMaker: AppViewModelMaker, appViewMaker: AppViewMaker) {
        await this._platform.init();
        this._platform.setNavigation(this._navigation);

        this._rootViewModel = new RootViewModel({
            logger: new NullLogger(),
            platform: this._platform,
            navigation: this._navigation,
            urlCreator: this._router,
            appViewModelMaker: appViewModelMaker,
        });

        const rootView = new RootView(this._rootViewModel, appViewMaker);
        this._rootNode.appendChild(rootView.mount());

        return this._rootViewModel.start();
    }
}
