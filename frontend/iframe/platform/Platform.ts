import { SessionInfoStorage } from "hydrogen-web/src/matrix/sessioninfo/localstorage/SessionInfoStorage";
import { RequestFunction } from "hydrogen-web/src/platform/types/types";
import { SettingsStorage } from "hydrogen-web/src/platform/web/dom/SettingsStorage";
import { Platform as BasePlatform } from "hydrogen-web/src/platform/web/Platform";
import { IConfig } from "../config/IConfig";
import { History } from "./History";
import { Navigation } from "./Navigation";
import { ServiceWorkerHandler } from "./ServiceWorkerHandler";
import { StorageFactory } from "./StorageFactory";

export class Platform extends BasePlatform {
    constructor(options) {
        const assetPaths = structuredClone(options.assetPaths);

        // Unset serviceWorker path so that the base constructor doesn't register the service worker handler.
        delete options.assetPaths?.serviceWorker;
        super(options);

        // Register our own service worker handler.
        let serviceWorkerHandler;
        if (assetPaths.serviceWorker && "serviceWorker" in navigator) {
            serviceWorkerHandler = new ServiceWorkerHandler();
            serviceWorkerHandler.registerAndStart(assetPaths.serviceWorker);
        }

        super.storageFactory = new StorageFactory(serviceWorkerHandler);
        super._serviceWorkerHandler = serviceWorkerHandler;

        super.settingsStorage = new SettingsStorage("chatrix_setting_v1_");
        super.sessionInfoStorage = new SessionInfoStorage("chatrix_sessions_v1");
        super.history = new History();
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

    get settingsStorage(): SettingsStorage {
        return super.settingsStorage;
    }

    set settingsStorage(settingsStorage: SettingsStorage) {
        super.settingsStorage = settingsStorage;
    }

    get sessionInfoStorage(): SessionInfoStorage {
        return super.sessionInfoStorage;
    }

    set sessionInfoStorage(sessionInfoStorage: SessionInfoStorage) {
        super.sessionInfoStorage = sessionInfoStorage;
    }

    get request(): RequestFunction {
        return super.request;
    }

    set request(request: RequestFunction) {
        super.request = request;
    }

    openUrl(url) {
        // Redirect the iframe's parent to the target url.
        console.log(`Redirecting to ${url}`);
        parent.location.href = url;
    }
}
