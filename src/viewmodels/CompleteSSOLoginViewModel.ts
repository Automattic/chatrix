/*
Copyright 2021 The Matrix.org Foundation C.I.C.

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

export class CompleteSSOLoginViewModel extends ViewModel {
    private _client: typeof Client;
    private _loginToken: string;
    private _isBusy: boolean;

    constructor(options) {
        super(options);
        const {
            loginToken,
            client
        } = options;
        this._loginToken = loginToken;
        this._client = client;
        this._isBusy = false;
        this.performSSOLoginCompletion();
    }

    get errorMessage() { return this._errorMessage; }

    _showError(message) {
        this._errorMessage = message;
        this.emitChange("errorMessage");
    }

    _setBusy(status) {
        this._isBusy = status;
        this.emitChange("isBusy");
    }

    async performSSOLoginCompletion() {
        if (!this._loginToken) {
            return;
        }
        const homeserver = await this.platform.settingsStorage.getString("sso_ongoing_login_homeserver");

        this._showError("")
        this._setBusy(true);

        const loginPromise = this.doLogin(homeserver, this._loginToken)
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
                this._showError(this._client.loginFailure);
                break;
            }
        }).finally(() => {
            this._setBusy(false)
        });
    }

    private async doLogin(homeserver: string, token: string): Promise<void> {
        const loginOptions = await this._client.queryLogin(homeserver).result;
        this._client.startWithLogin(loginOptions.token(token));

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
