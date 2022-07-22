/*
Copyright 2022 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { RoomViewModel, ViewModel } from "hydrogen-view-sdk";
import { createCustomTileClassForEntry } from "./tiles";

export class ChatterboxViewModel extends ViewModel {
    private _roomViewModel?: typeof RoomViewModel;
    private _loginPromise: Promise<void>;

    constructor(options) {
        super(options);
        this._client = options.client;
        this._loginPromise = options.loginPromise;
        this.emitOnRoomViewModelChange = this.emitOnRoomViewModelChange.bind(this);
    }

    async load() {
        // wait until login is completed
        await this._loginPromise;
        let room;
        if(this._options.config["auto_join_room"]) {
            room = await this.joinRoomSpecifiedInConfig();
        } else {
            throw new Error("ConfigError: You must specify 'auto_join_room'");
        }
        this._roomViewModel = this.track(new RoomViewModel(this.childOptions({
            room,
            ownUserId: this._session.userId,
            platform: this.platform,
            urlCreator: this.urlCreator,
            navigation: this.navigation,
            tileClassForEntry: createCustomTileClassForEntry(this._session.userId),
        })));
        await this._roomViewModel.load();
        this._roomViewModel.on("change", this.emitOnRoomViewModelChange);
        this.emitChange("roomViewModel");
    }

    private emitOnRoomViewModelChange() {
        this.emitChange("roomViewModel");
    }

    private async joinRoomSpecifiedInConfig() {
        const roomId = this._options.config["auto_join_room"];
        let room = this._session.rooms.get(roomId);
        if (!room) {
            // user is not in specified room, so join it
            await this._session.joinRoom(roomId);
            // even though we've joined the room, we need to wait till the next sync to get the room
            await this._waitForRoomFromSync(roomId);
            room = this._session.rooms.get(roomId);
        }
        return room;
    }

    private _waitForRoomFromSync(roomId: string): Promise<void> {
        let resolve: () => void;
        const promise: Promise<void> = new Promise(r => { resolve = r; })
        const subscription = {
            onAdd: (_: string, value: {id: string}) => {
                if (value.id === roomId) {
                    this._session.rooms.unsubscribe(subscription);
                    resolve();
                }
            },
            onUpdate: () => undefined,
            onRemove: () => undefined,
        };
        this._session.rooms.subscribe(subscription);
        return promise;
    }

    dispose() {
        super.dispose();
        this._roomViewModel.off("change", this.emitOnRoomViewModelChange);
    }

    minimize() {
        (window as any).sendMinimizeToParent();
        this.navigation.push("minimize");
    }

    showSettings() {
        this.navigation.push("settings");
    }

    get timelineViewModel() {
        return this._roomViewModel?.timelineViewModel;
    }

    get messageComposerViewModel() {
        return this._roomViewModel?.composerViewModel;
    }

    get roomViewModel() {
        return this._roomViewModel;
    }

    get roomName() {
        return this._options.config["header"]?.["title"] ?? "";
    }

    get customAvatarURL() {
        // has user specified specific avatar to use in config?
        return this._options.config["header"]?.["avatar"];
    }

    private get _session() {
        return this._client.session;
    }

    get footerViewModel() {
        return this.options.footerVM;
    }
}
