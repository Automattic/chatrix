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

import { ViewModel } from "hydrogen-view-sdk";
import "hydrogen-view-sdk/style.css";
import {IChatterboxConfig} from "../types/IChatterboxConfig";

export class SSOBeginViewModel extends ViewModel {
    private readonly _config: IChatterboxConfig;

    constructor(options) {
        super(options);
        this._config = options.config;
    }

    get homeserver() {
        return this._config.homeserver
    }

    async beginSSO() {
        await this.platform.settingsStorage.setString("sso_ongoing_login_homeserver", this.homeserver);
        this.redirect()
    }

    private redirect() {
        const returnURL = window.location.origin
        document.location.href = `${this.homeserver}/_matrix/client/r0/login/sso/redirect?redirectUrl=${returnURL}`;
    }
}
