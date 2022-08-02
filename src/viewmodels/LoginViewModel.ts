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

import {Client, ViewModel} from "hydrogen-view-sdk";
import "hydrogen-view-sdk/style.css";
import {PasswordLoginViewModel} from "./PasswordLoginViewModel";
import {CompleteSSOLoginViewModel} from "./CompleteSSOLoginViewModel";
import {IChatterboxConfig} from "../types/IChatterboxConfig";
import {SSOBeginViewModel} from "./SSOBeginViewModel";

export class LoginViewModel extends ViewModel {
    private readonly _config: IChatterboxConfig;
    private _client: typeof Client;
    private _welcomeMessageHeading: string;
    private _welcomeMessageText: string;
    private _errorMessage: string;
    private readonly _passwordLoginViewModel: PasswordLoginViewModel;
    private readonly _ssoBeginViewModel: SSOBeginViewModel;
    private readonly _completeSSOLoginViewModel: CompleteSSOLoginViewModel;

    constructor(options) {
        super(options);
        const {config, client} = options;
        this._config = config;
        this._client = client;
        this._welcomeMessageHeading = config.welcome_message_heading;
        this._welcomeMessageText = config.welcome_message_text;

        if (config.token) {
           return  this._completeSSOLoginViewModel = this.track(new CompleteSSOLoginViewModel(
                this.childOptions( {
                    client: this._client,
                    loginToken: config.token
                })
            ));
        }

        if (config.login_methods.length === 0) {
            this._errorMessage = "No login methods are configured. Please contact the site's administrator."
        }

        if (config.login_methods.includes("password")) {
            this._passwordLoginViewModel = this.track(new PasswordLoginViewModel(
                this.childOptions({
                    config: this._config,
                    client: this._client,
                })
            ));
        }

        if (config.login_methods.includes("sso")) {
            this._ssoBeginViewModel = this.track(new SSOBeginViewModel(
                this.childOptions({
                    config: this._config,
                })
            ));
        }
    }

    minimize(): void {
        (window as any).sendMinimizeToParent();
        this.navigation.push("minimize");
    }

    get passwordLoginViewModel() {
        return this._passwordLoginViewModel;
    }

    get ssoBeginViewModel() {
        return this._ssoBeginViewModel;
    }

    get welcomeMessageHeading() {
        return this._welcomeMessageHeading;
    }

    get welcomeMessageText() {
        return this._welcomeMessageText;
    }

    get errorMessage() {
        return this._errorMessage;
    }
}
