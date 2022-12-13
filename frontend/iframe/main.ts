import { parseUrlPath, stringifyPath } from "hydrogen-web/src/domain/navigation";
import { NullLogger } from "hydrogen-web/src/logging/NullLogger";
import assetPaths from "./assets";
import { ConfigFactory } from "./config/ConfigFactory";
import { createNavigation, Navigation } from "./platform/Navigation";
import { Platform } from "./platform/Platform";
import { URLRouter } from "./platform/URLRouter";
import { RootViewModel } from "./viewmodels/RootViewModel";
import { RootView } from "./views/RootView";

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

    public async start() {
        await this._platform.init();
        this._platform.setNavigation(this._navigation);

        this._rootViewModel = new RootViewModel({
            logger: new NullLogger(),
            platform: this._platform,
            navigation: this._navigation,
            urlRouter: this._router,
        });

        const rootView = new RootView(this._rootViewModel);
        this._rootNode.appendChild(rootView.mount());

        return this._rootViewModel.start();
    }
}
