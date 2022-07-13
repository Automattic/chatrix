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

export class PasswordLoginViewModel extends ViewModel {
    private readonly _config: IChatterboxConfig;
    private _username: string;
    private _password: string;
    private _errorMessage: string;

    constructor(options) {
        super(options);
        this._config = options.config;
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
    }
}
