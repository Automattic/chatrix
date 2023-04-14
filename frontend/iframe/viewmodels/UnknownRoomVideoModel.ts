import {UnknownRoomViewModel as BaseUnknownRoomViewModel} from "hydrogen-web/src/domain/session/room/UnknownRoomViewModel";
import {SegmentType} from "hydrogen-web/src/domain/navigation";
import {Segment} from "hydrogen-web/src/domain/navigation/Navigation";

export class UnknownRoomViewModel extends BaseUnknownRoomViewModel {
    private readonly _singleRoomId: any;

    constructor(options) {
        super(options);
        this._singleRoomId = options.singleRoomId;
    }

    get navigation() {
        return super.navigation;
    }

    get urlRouter() {
        return super.urlRouter;
    }

    get closeUrl() {
        if (this._singleRoomId) {
            const path = this.navigation.path.with(new Segment<SegmentType>("session"));
            return this.urlRouter.urlForPath(path);
        }

        return super.closeUrl;
    }
}
