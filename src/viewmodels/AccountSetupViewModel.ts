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

import { ViewModel, Client, LoadStatus } from "hydrogen-view-sdk";
import { IChatterboxConfig } from "../types/IChatterboxConfig";
import "hydrogen-view-sdk/style.css";


export class AccountSetupViewModel extends ViewModel {
    private _config: IChatterboxConfig;
    private _client: typeof Client;
    private _username: string;
    private _password: string;
    private _privacyPolicyLink: string;
    private _showButtonSpinner: boolean = false;

    constructor(options) {
        super(options);
        this._client = options.client;
        this._config = options.config;
        // temporarily get username and password of the user we are working with from the config
        this._username = options.config.username;
        this._password = options.config.password;

        const loginPromise = this.login();
        this.navigation.push("timeline", loginPromise);
    }

    async login(): Promise<void> {
        const loginOptions = await this._client.queryLogin(this._homeserver).result;
        this._client.startWithLogin(loginOptions.password(this._username, this._password));
        await this._client.loadStatus.waitFor((status: string) => {
            return status === LoadStatus.Ready ||
                status === LoadStatus.Error ||
                status === LoadStatus.LoginFailed;
        }).promise;

        if (this._client.loginFailure) {
            throw new Error("login failed: " + this._client.loginFailure);
        } else if (this._client.loadError) {
            throw new Error("load failed: " + this._client.loadError.message);
        }
    }

    minimize(): void {
        (window as any).sendMinimizeToParent();
        this.navigation.push("minimize");
    }

    private get _homeserver(): string {
        return this._config.homeserver;
    }

    get privacyPolicyLink() {
        return this._privacyPolicyLink;
    }

    get footerViewModel() {
        return this.options.footerVM;
    }

    get showButtonSpinner(): boolean {
        return this._showButtonSpinner;
    }
}
