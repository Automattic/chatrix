import { SegmentType } from "hydrogen-web/src/domain/navigation";
import { Segment } from "hydrogen-web/src/domain/navigation/Navigation";
import { SettingsViewModel as BaseSettingsViewModel } from "hydrogen-web/src/domain/session/settings/SettingsViewModel";
import { URLRouter } from "../platform/URLRouter";

export class SettingsViewModel extends BaseSettingsViewModel {
    private readonly _singleRoomId: string | undefined;

    constructor(options) {
        super(options);
        this._singleRoomId = options.singleRoomId;
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
            const path = this.navigation.path.with(new Segment<SegmentType>("room", this._singleRoomId));

            return this.urlRouter.urlForPath(path);
        }

        return super.closeUrl;
    }

    get singleRoomMode(): boolean {
        return !!this._singleRoomId;
    }
}
