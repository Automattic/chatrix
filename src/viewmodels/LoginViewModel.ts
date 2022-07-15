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
import {IChatterboxConfig} from "../types/IChatterboxConfig";
import {SSOBeginViewModel} from "./SSOBeginViewModel";

export class LoginViewModel extends ViewModel {
    private readonly _config: IChatterboxConfig;
    private _client: typeof Client;
    private readonly _passwordLoginViewModel: PasswordLoginViewModel;
    private readonly _ssoBeginViewModel: SSOBeginViewModel;

    constructor(options) {
        super(options);
        this._config = options.config;
        this._client = options.client;
        this._passwordLoginViewModel = this.track(new PasswordLoginViewModel(
            this.childOptions({
                config: this._config,
                client: this._client,
                state: this._state,
            })
        ));
        this._ssoBeginViewModel = this.track(new SSOBeginViewModel(
            this.childOptions({
                config: this._config,
                state: this._state,
            })
        ));
    }

    minimize(): void {
        (window as any).sendMinimizeToParent();
        this.navigation.push("minimize");
    }

    get passwordLoginViewModel() {
        return this._passwordLoginViewModel
    }

    get ssoBeginViewModel() {
        return this._ssoBeginViewModel
    }
}
