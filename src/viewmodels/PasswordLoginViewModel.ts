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

import { Client, LoadStatus, ViewModel } from "hydrogen-view-sdk";
import "hydrogen-view-sdk/style.css";
import { IChatrixConfig } from "../types/IChatrixConfig";

export class PasswordLoginViewModel extends ViewModel {
    private readonly _config: IChatrixConfig;
    private _client: typeof Client;
    private _username: string;
    private _password: string;
    private _errorMessage: string;
    private _isBusy: boolean;

    constructor(options) {
        super(options);
        this._config = options.config;
        this._client = options.client;
        this._errorMessage = "";
        this._isBusy = false;
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

    get isBusy() {
        return this._isBusy;
    }

    _showError(message) {
        this._errorMessage = message;
        this.emitChange("errorMessage");
    }

    _setBusy(status) {
        this._isBusy = status;
        this.emitChange("isBusy");
    }

    async login(username: string, password: string) {
        this._showError("")
        this._setBusy(true);

        const loginPromise = this.doLogin(username, password)
        loginPromise.then(() => {
            this._showError("")
            this.navigation.push("timeline", loginPromise);
        }).catch(() => {
            switch (this._client.loginFailure) {
                case "Credentials":
                    this._showError(this.i18n`Your username and/or password don't seem to be correct.`);
                    break;
                case "Connection":
                    this._showError(this.i18n`Can't connect to ${this._config.homeserver}.`);
                    break;
                default:
                    this._showError(this.i18n`Something went wrong while checking your login and password.`);
                    break;
            }
        }).finally(() => {
            this._setBusy(false)
        });
    }

    private async doLogin(username: string, password: string): Promise<void> {
        const loginOptions = await this._client.queryLogin(this._config.homeserver).result;
        this._client.startWithLogin(loginOptions.password(username, password));

        await this._client.loadStatus.waitFor((status: string) => {
            return status === LoadStatus.Ready ||
                status === LoadStatus.Error ||
                status === LoadStatus.LoginFailed;
        }).promise;

        if (this._client.loginFailure) {
            throw new Error(this._client.loginFailure);
        } else if (this._client.loadError) {
            throw new Error(this._client.loadError.message);
        }
    }
}
