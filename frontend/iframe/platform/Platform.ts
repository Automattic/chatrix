import { SessionInfoStorage } from "hydrogen-web/src/matrix/sessioninfo/localstorage/SessionInfoStorage";
import { SettingsStorage } from "hydrogen-web/src/platform/web/dom/SettingsStorage";
import { Platform as BasePlatform } from "hydrogen-web/src/platform/web/Platform";
import { IConfig } from "../config/IConfig";
import { History } from "./History";
import { Navigation } from "./Navigation";
import { ServiceWorkerHandler } from "./ServiceWorkerHandler";
import { StorageFactory } from "./StorageFactory";

export class Platform extends BasePlatform {
    private settingsStorage: SettingsStorage;
    private sessionInfoStorage: SessionInfoStorage;
    private storageFactory: StorageFactory;
    private _serviceWorkerHandler: ServiceWorkerHandler;

    constructor(options) {
        const assetPaths = structuredClone(options.assetPaths);

        // Unset serviceWorker path so that the base constructor doesn't register the service worker handler.
        delete options.assetPaths.serviceWorker;
        super(options);

        // Register our own service worker handler.
        if (assetPaths.serviceWorker && "serviceWorker" in navigator) {
            this._serviceWorkerHandler = new ServiceWorkerHandler();
            this._serviceWorkerHandler.registerAndStart(assetPaths.serviceWorker);
        }

        this.settingsStorage = new SettingsStorage("chatrix_setting_v1_");
        this.sessionInfoStorage = new SessionInfoStorage("chatrix_sessions_v1");
        this.storageFactory = new StorageFactory(this._serviceWorkerHandler);
        this.history = new History();
    }

    public get history(): History {
        return super.history;
    }

    public set history(history: History) {
        super.history = history;
    }

    public setNavigation(navigation: Navigation) {
        super.setNavigation(navigation);
    }

    async init() {
        super.init();
    }

    get config(): IConfig {
        return super.config;
    }

    openUrl(url) {
        // Redirect the iframe's parent to the target url.
        console.log(`Redirecting to ${url}`);
        parent.location.href = url;
    }
}
