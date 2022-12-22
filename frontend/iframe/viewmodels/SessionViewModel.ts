import { SessionViewModel as BaseSessionViewModel } from "hydrogen-web/src/domain/session/SessionViewModel";
import { RoomViewModel } from "./RoomViewModel";
import { SettingsViewModel } from "./SettingsViewModel";

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

    _updateSettings(settingsOpen) {
        if (this.settingsViewModel) {
            this.settingsViewModel = super.disposeTracked(super.settingsViewModel);
        }
        if (settingsOpen) {
            this.settingsViewModel = super.track(new SettingsViewModel(super.childOptions({
                client: this.client,
            })));
            void this.settingsViewModel.load();
        }
        super.emitChange("activeMiddleViewModel");
    }

    private get settingsViewModel(): SettingsViewModel {
        // @ts-ignore
        return this._settingsViewModel;
    }

    private set settingsViewModel(vm: SettingsViewModel) {
        // @ts-ignore
        this._settingsViewModel = vm;
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
