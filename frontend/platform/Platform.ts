import { SessionInfoStorage } from "hydrogen-web/src/matrix/sessioninfo/localstorage/SessionInfoStorage";
import { SettingsStorage } from "hydrogen-web/src/platform/web/dom/SettingsStorage";
import { Platform as BasePlatform } from "hydrogen-web/src/platform/web/Platform";
import { History } from "./History";
import { Navigation } from "./Navigation";
import { StorageFactory } from "./StorageFactory";

export class Platform extends BasePlatform {
    private settingsStorage: SettingsStorage;
    private sessionInfoStorage: SessionInfoStorage;
    private storageFactory: StorageFactory;

    constructor(options) {
        super(options);
        this.settingsStorage = new SettingsStorage("chatrix_setting_v1_");
        this.sessionInfoStorage = new SessionInfoStorage("chatrix_sessions_v1");
        // @ts-ignore
        this.storageFactory = new StorageFactory(this._serviceWorkerHandler);
        // @ts-ignore
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

    openUrl(url) {
        // Redirect the iframe's parent to the target url.
        console.log(`Redirecting to ${url}`);
        parent.location.href = url;
    }
}
