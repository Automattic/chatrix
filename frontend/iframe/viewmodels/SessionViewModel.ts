import { SessionViewModel as BaseSessionViewModel } from "hydrogen-web/src/domain/session/SessionViewModel";
import { RoomViewModel } from "./RoomViewModel";
import { UnknownRoomViewModel } from "./UnknownRoomVideoModel";
import { SettingsViewModel } from "./SettingsViewModel";

export class SessionViewModel extends BaseSessionViewModel {
    private readonly _singleRoomId: string | undefined;

    constructor(options) {
        super(options);
        this._singleRoomId = options.singleRoomId;
    }

    get id() {
        return super.id;
    }

    start() {
        super.start();
    }

    i18n(parts: TemplateStringsArray, ...expr: any[]): string {
        return super.i18n(parts, expr);
    }

    get activeMiddleViewModel() {
        return super.activeMiddleViewModel;
    }

    get roomGridViewModel() {
        return super.roomGridViewModel;
    }

    get leftPanelViewModel() {
        return super.leftPanelViewModel;
    }

    get sessionStatusViewModel() {
        return super.sessionStatusViewModel;
    }

    get currentRoomViewModel() {
        // @ts-ignore
        return this._roomViewModelObservable?.get();
    }

    get rightPanelViewModel() {
        return super.rightPanelViewModel;
    }

    get createRoomViewModel() {
        return super.createRoomViewModel;
    }

    get joinRoomViewModel() {
        return super.joinRoomViewModel;
    }

    _updateSettings(settingsOpen) {
        if (this.settingsViewModel) {
            this.settingsViewModel = super.disposeTracked(super.settingsViewModel);
        }
        if (settingsOpen) {
            this.settingsViewModel = super.track(new SettingsViewModel(super.childOptions({
                client: this.client,
                singleRoomId: this._singleRoomId,
            })));
            void this.settingsViewModel.load();
        }
        super.emitChange("activeMiddleViewModel");
    }

    get settingsViewModel(): SettingsViewModel {
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
            const roomVM = new RoomViewModel(super.childOptions({
                room,
                singleRoomMode: this._singleRoomId !== undefined
            }));
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

    async _createUnknownRoomViewModel(roomIdOrAlias, isWorldReadablePromise) {
        return new UnknownRoomViewModel(super.childOptions({
            roomIdOrAlias,
            session: this.client.session,
            isWorldReadablePromise: isWorldReadablePromise,
            guestJoinAllowed: false,
            singleRoomId: this._singleRoomId,
        }));
    }
}
