import { SettingsViewModel as BaseSettingsViewModel } from "hydrogen-web/src/domain/session/settings/SettingsViewModel";

export class SettingsViewModel extends BaseSettingsViewModel {
    constructor(options) {
        super(options);
    }

    async load() {
        return super.load();
    }
}
