import { SessionViewModel as BaseSessionViewModel } from "hydrogen-web/src/domain/session/SessionViewModel";
import { RoomViewModel } from "./RoomViewModel";

export class SessionViewModel extends BaseSessionViewModel {
    constructor(options) {
        super(options);
    }

    get id() {
        return super.id;
    }

    start() {
        super.start();
    }

    dispose(): void {
        super.dispose();
    }

    private get client() {
        // @ts-ignore
        return this._client;
    }

    _createRoomViewModelInstance(roomId) {
        const room = this.client.session.rooms.get(roomId);
        if (room) {
            const roomVM = new RoomViewModel(super.childOptions({room}));
            void roomVM.load();
            return roomVM;
        }
        return null;
    }

    async _createArchivedRoomViewModel(roomId) {
        const room = await this.client.session.loadArchivedRoom(roomId);
        if (room) {
            const roomVM = new RoomViewModel(super.childOptions({room}));
            void roomVM.load();
            return roomVM;
        }
        return null;
    }
}
