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
import {IChatterboxConfig} from "../types/IChatterboxConfig";

export class SettingsViewModel extends ViewModel {
    // @ts-ignore
    private readonly _config: IChatterboxConfig;
    // @ts-ignore
    private _client: typeof Client;

    constructor(options) {
        super(options);
        const {config, client} = options;
        this._config = config;
        this._client = client;
    }
}
