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

import {Client, ViewModel, LoadStatus} from "hydrogen-view-sdk";
import "hydrogen-view-sdk/style.css";
import {IChatterboxConfig} from "../types/IChatterboxConfig";

export class PasswordLoginViewModel extends ViewModel {
    private readonly _config: IChatterboxConfig;
    private _client: typeof Client;
    private _username: string;
    private _password: string;
    private _errorMessage: string;

    constructor(options) {
        super(options);
        this._config = options.config;
        this._client = options.client;
        this._username = this._config.username;
        this._password = this._config.password;
        this._errorMessage = "";
    }

    get username() {
        return this._username;
    }

    get password() {
        return this._password;
    }

    get errorMessage() {
        return this._errorMessage;
    }

    _showError(message) {
        this._errorMessage = message;
        this.emitChange("errorMessage");
    }

    async login(username: string, password: string) {
        this._showError("")

        const loginOptions = await this._client.queryLogin(this._config.homeserver).result;
        this._client.startWithLogin(loginOptions.password(username, password));

        const loadStatus = this._client.loadStatus;
        const handle = loadStatus.waitFor(status => status !== LoadStatus.Login);
        await handle.promise;

        const status = loadStatus.get();
        if (status === LoadStatus.LoginFailed) {
            let error = "";
            switch (this._client.loginFailure) {
                case "Credentials":
                    error = this.i18n`Your username and/or password don't seem to be correct.`;
                    break;
                case "Connection":
                    error = this.i18n`Can't connect to ${this._config.homeserver}.`;
                    break;
                default:
                    error = this.i18n`Something went wrong while checking your login and password.`;
                    break;
            }

            this._showError(error);
            return;
        }

        this.navigation.push("timeline");
    }
}
