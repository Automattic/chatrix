import downloadSandboxPath from "hydrogen-view-sdk/download-sandbox.html?url";
import workerPath from "hydrogen-view-sdk/main.js?url";
import olmWasmPath from "@matrix-org/olm/olm.wasm?url";
import olmJsPath from "@matrix-org/olm/olm.js?url";
import olmLegacyJsPath from "@matrix-org/olm/olm_legacy.js?url";
import { createRouter, Navigation, Platform, URLRouter } from "hydrogen-view-sdk";
import { RootViewModel, Section } from "./viewmodels/RootViewModel";
import { RootView } from "./views/RootView";
import { AppViewModelMaker } from "./viewmodels/AppViewModel";
import { AppViewMaker } from "./views/AppView";

const assetPaths = {
    downloadSandbox: downloadSandboxPath,
    worker: workerPath,
    olm: {
        wasm: olmWasmPath,
        legacyBundle: olmLegacyJsPath,
        wasmBundle: olmJsPath,
    },
};

function allowsChild(parent: any, child: any) {
    const allowed = [
        Section.Loading,
        Section.Login,
        Section.App,
    ];

    const { type } = child;
    switch (parent?.type) {
        case undefined:
            return allowed.includes(type);
        default:
            return false;
    }
}

export class Main {
    private readonly _platform: typeof Platform;
    private readonly _navigation: typeof Navigation;
    private readonly _router: typeof URLRouter;
    private readonly _rootNode: HTMLDivElement;
    private _rootViewModel: RootViewModel | undefined;

    constructor(rootDivId: string) {
        this._rootNode = document.querySelector(`#${rootDivId}`) as HTMLDivElement;
        if (!this._rootNode) {
            throw new Error(`Element with id #${rootDivId} not found.`);
        }

        this._rootNode.className = "hydrogen";
        this._platform = new Platform({ container: this._rootNode, assetPaths });

        this._navigation = new Navigation(allowsChild);
        this._platform.setNavigation(this._navigation);

        this._router = createRouter({ navigation: this.navigation, history: this.platform.history });
        this._router.attach();
    }

    public get platform(): typeof Platform {
        return this._platform;
    }

    public get navigation(): typeof Navigation {
        return this._navigation;
    }

    public get router(): typeof URLRouter {
        return this._router;
    }

    public async start(appViewModelMaker: AppViewModelMaker, appViewMaker: AppViewMaker) {
        this._rootViewModel = new RootViewModel({
            platform: this.platform,
            navigation: this.navigation,
            urlCreator: this.router,
            appViewModelMaker: appViewModelMaker,
        });

        const rootView = new RootView(this._rootViewModel, appViewMaker);
        this._rootNode.appendChild(rootView.mount());

        return this._rootViewModel.start();
    }
}
