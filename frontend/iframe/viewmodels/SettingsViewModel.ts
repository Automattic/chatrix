import { SegmentType } from "hydrogen-web/src/domain/navigation";
import { Segment } from "hydrogen-web/src/domain/navigation/Navigation";
import { SettingsViewModel as BaseSettingsViewModel } from "hydrogen-web/src/domain/session/settings/SettingsViewModel";
import { URLRouter } from "../platform/URLRouter";

export class SettingsViewModel extends BaseSettingsViewModel {
    constructor(options) {
        super(options);
    }

    async load() {
        return super.load();
    }

    get urlRouter(): URLRouter {
        return super.urlRouter;
    }

    get navigation() {
        return super.navigation;
    }

    get closeUrl() {
        if (this.singleRoomMode) {
            const roomId = super.platform.config.roomId;
            const path = this.navigation.path.with(new Segment<SegmentType>("room", roomId));

            return this.urlRouter.urlForPath(path);
        }

        return super.closeUrl;
    }

    get singleRoomMode(): boolean {
        return !!super.platform.config.roomId;
    }
}
