import { RoomViewModel as BaseRoomViewModel } from "hydrogen-web/src/domain/session/room/RoomViewModel";
import { URLRouter } from "../platform/URLRouter";

export class RoomViewModel extends BaseRoomViewModel {
    private readonly _singleRoomMode: boolean;
    constructor(options) {
        super(options);
        this._singleRoomMode = options.singleRoomMode;
    }

    async load() {
        super.load();
    }

    get urlRouter(): URLRouter {
        return super.urlRouter;
    }

    get singleRoomMode(): boolean {
        return this._singleRoomMode;
    }

    get navigation() {
        return super.navigation;
    }

    i18n(parts: TemplateStringsArray, ...expr: any[]): string {
        return super.i18n(parts, expr);
    }

    openDetailsPanel() {
        super.openDetailsPanel();
    }

    get canLeave() {
        return super.canLeave;
    }

    get canForget() {
        return super.canForget;
    }

    forgetRoom() {
        super.forgetRoom();
    }

    get canRejoin() {
        return super.canRejoin;
    }

    rejoinRoom() {
        super.rejoinRoom();
    }
}
