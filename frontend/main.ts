import downloadSandboxPath from "hydrogen-view-sdk/download-sandbox.html?url";
import workerPath from "hydrogen-view-sdk/main.js?url";
import olmWasmPath from "@matrix-org/olm/olm.wasm?url";
import olmJsPath from "@matrix-org/olm/olm.js?url";
import olmLegacyJsPath from "@matrix-org/olm/olm_legacy.js?url";
import { RootViewModel } from "./viewmodels/RootViewModel";
import { RootView } from "./views/RootView";
import { AppViewModelMaker } from "./viewmodels/AppViewModel";
import { AppViewMaker } from "./views/AppView";
import { IConfig } from "./config";
import { parseUrlPath, SegmentType, stringifyPath } from "hydrogen-web/src/domain/navigation";
import { Navigation, Segment } from "hydrogen-web/src/domain/navigation/Navigation";
import { NullLogger } from "hydrogen-web/src/logging/NullLogger";
import "hydrogen-view-sdk/style.css";
import { URLRouter } from "./platform/URLRouter";
import { Platform } from "./platform/Platform";

const assetPaths = {
    downloadSandbox: downloadSandboxPath,
    worker: workerPath,
    olm: {
        wasm: olmWasmPath,
        legacyBundle: olmLegacyJsPath,
        wasmBundle: olmJsPath,
    },
};

export enum Section {
    Loading = "loading",
    Login = "login",
    App = "app",
}

function allowsChild(parent: Segment<SegmentType> | undefined, child: Segment<SegmentType>): boolean {
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
    private readonly _config: IConfig;
    private readonly _platform: Platform;
    private readonly _navigation: Navigation<SegmentType>;
    private readonly _router: URLRouter;
    private readonly _rootNode: HTMLDivElement;
    private _rootViewModel: RootViewModel | undefined;

    constructor(rootDivId: string) {
        this._rootNode = document.querySelector(`#${rootDivId}`) as HTMLDivElement;
        if (!this._rootNode) {
            throw new Error(`Element with id #${rootDivId} not found.`);
        }
        this._rootNode.className = "hydrogen";

        this._config = this.parseConfig();

        this._platform = new Platform({
            container: this._rootNode,
            assetPaths,
            config: {
                bugReportEndpointUrl: null,
            },
        });

        this._navigation = new Navigation(allowsChild);
        // @ts-ignore
        this._platform.setNavigation(this._navigation);

        // @ts-ignore
        this._router = new URLRouter(this.platform.history, this.navigation, parseUrlPath, stringifyPath);
        this._router.attach();
    }

    public get platform(): Platform {
        return this._platform;
    }

    public get navigation(): Navigation<SegmentType> {
        return this._navigation;
    }

    public get router(): URLRouter {
        return this._router;
    }

    public async start(appViewModelMaker: AppViewModelMaker, appViewMaker: AppViewMaker) {
        this._rootViewModel = new RootViewModel({
            logger: new NullLogger(),
            platform: this.platform,
            navigation: this.navigation,
            urlCreator: this.router,
            appViewModelMaker: appViewModelMaker,
            config: this._config
        });

        const rootView = new RootView(this._rootViewModel, appViewMaker);
        this._rootNode.appendChild(rootView.mount());

        return this._rootViewModel.start();
    }

    private parseConfig(): IConfig {
        const params = new URLSearchParams(window.location.search);

        let get = (name: string) => {
            let param = params.get(name);
            if (!param || param === "") {
                param = null;
            }
            return param;
        };

        return {
            homeserver: get("homeserver"),
            localStorageKey: get("localStorageKey"),
            loginToken: get("loginToken"),
        }
    }
}
