import { RoomViewModel as BaseRoomViewModel } from "hydrogen-web/src/domain/session/room/RoomViewModel";

export class RoomViewModel extends BaseRoomViewModel {
    constructor(options) {
        super(options);
    }

    async load() {
        super.load();
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
