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

import { Client, createRouter, LoadStatus, Navigation, Platform, RoomStatus, ViewModel } from "hydrogen-view-sdk";
import { IChatrixConfig } from "../types/IChatrixConfig";
import { ChatrixViewModel } from "./ChatrixViewModel";
import "hydrogen-view-sdk/style.css";
import { MessageFromParent } from "../observables/MessageFromParent";
import { LoginViewModel } from "./LoginViewModel";
import { SettingsViewModel } from "./SettingsViewModel";

type Options = { platform: typeof Platform, navigation: typeof Navigation, urlCreator: ReturnType<typeof createRouter>, startMinimized: boolean, loginToken: string };

export class RootViewModel extends ViewModel {
    private _config: IChatrixConfig;
    private _client: typeof Client;
    private _chatrixViewModel?: ChatrixViewModel;
    private _loginViewModel?: LoginViewModel;
    private _settingsViewModel?: SettingsViewModel;
    private _activeSection?: string;
    private _messageFromParent: MessageFromParent = new MessageFromParent();
    private _startMinimized: boolean;
    private _loginToken: string;
    private _isWatchingNotificationCount: boolean;

    constructor(config: IChatrixConfig, options: Options) {
        super(options);
        this._startMinimized = options.startMinimized;
        this._config = config;
        this._loginToken = options.loginToken;
        this._client = new Client(this.platform);
        this._setupNavigation();
        this._messageFromParent.on("maximize", () => this.start());
        // Chatterbox can be minimized via the start button on the parent page!
        this._messageFromParent.on("minimize", () => this.navigation.push("minimize"));
    }

    minimizeChatrix() {
        this._chatrixViewModel = this.disposeTracked(this._chatrixViewModel);
        this._accountSetupViewModel = this.disposeTracked(this._chatrixViewModel);
        this._activeSection = "";
        this.emitChange("chatrixViewModel");
    }

    async start() {
        const sessionAlreadyExists = await this.attemptStartWithExistingSession();
        if (sessionAlreadyExists) {
            if (!this._isWatchingNotificationCount) {
                this._watchNotificationCount();
            }
            if (this._startMinimized) {
                // when CB is maximized, this function is run again
                // don't start in minimized state then
                this._startMinimized = false;
                return;
            }
            this.navigation.push("timeline");
            return;
        }
        this.navigation.push("login");
    }

    get chatrixViewModel() {
        return this._chatrixViewModel;
    }

    private _showLogin() {
        this._activeSection = "login";
        this._loginViewModel = this.track(new LoginViewModel(
            this.childOptions({
                client: this._client,
                config: this._config,
                loginToken: this._loginToken,
                state: this._state,
                platform: this.platform,
            })
        ));
        this.emitChange("activeSection");
    }

    private _showSettings() {
        this._activeSection = "settings";
        this._settingsViewModel = this.track(new SettingsViewModel(
            this.childOptions({
                client: this._client,
                config: this._config,
            })
        ));
        this.emitChange("activeSection");
    }

    /**
     * Try to start Hydrogen based on an existing hydrogen session.
     * If multiple sessions exist, this method chooses the most recent one.
     */
    async attemptStartWithExistingSession(): Promise<boolean> {
        const sessionIds = await this.platform.sessionInfoStorage.getAll();
        const session = sessionIds.pop();
        if (session) {
            const { id } = session;
            await this._client.startWithExistingSession(id);
            return true;
        }
        return false;
    }

    private async _watchNotificationCount() {
        await this._client.loadStatus.waitFor(s => s === LoadStatus.Ready).promise;
        const roomId = await this.platform.settingsStorage.getString("created-room-id") ?? this._config.room_id;
        const observable = await this._client.session.observeRoomStatus(roomId);
        await observable.waitFor((status) => status === RoomStatus.Joined).promise;
        const room = this._client.session.rooms.get(roomId);
        let previousCount = room.notificationCount;
        (window as any).sendNotificationCount(previousCount);
        const subscription = {
            onUpdate(_: unknown, room) {
                const newCount = room.notificationCount;
                if (newCount !== previousCount) {
                    if (!room.isUnread && newCount !== 0) {
                        /*
                        when chatterbox is maximized and there are previous unread messages,
                        this condition is hit but we still want to send the notification count so that 
                        the badge zeroes out.
                        */
                        room.clearUnread();
                        return;
                    }
                    (window as any).sendNotificationCount(newCount);
                    previousCount = newCount;
                }
            },
        };
        this.track(this._client.session.rooms.subscribe(subscription));
        this._isWatchingNotificationCount = true;
    }

    private _setupNavigation() {
        this.navigation.observe("login").subscribe(() => this._showLogin());
        this.navigation.observe("settings").subscribe(() => this._showSettings());
        this.navigation.observe("timeline").subscribe((loginPromise) => this._showTimeline(loginPromise));
        this.navigation.observe("minimize").subscribe(() => this.minimizeChatrix());
    }

    private async _showTimeline(loginPromise: Promise<void>) {
        this._activeSection = "timeline";
        if (!this._chatrixViewModel) {
            this._chatrixViewModel = this.track(new ChatrixViewModel(
                this.childOptions({
                    client: this._client,
                    config: this._config,
                    state: this._state,
                    loginPromise,
                })
            ));
            await this._chatrixViewModel.load();
            if (!this._isWatchingNotificationCount) {
                // for when chatterbox is loaded initially
                this._watchNotificationCount();
            }
        }
        this.emitChange("activeSection");
    }

    get loginViewModel() {
        return this._loginViewModel;
    }

    get settingsViewModel() {
        return this._settingsViewModel;
    }

    get activeSection() {
        return this._activeSection;
    }
}
