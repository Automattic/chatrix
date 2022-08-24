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

import { TemplateView } from "hydrogen-view-sdk";
import { RootViewModel } from "../../viewmodels/RootViewModel";
import { ChatrixView } from "./ChatrixView";
import { LoginView } from "./LoginView";
import { SettingsView } from "./SettingsView";

export class RootView extends TemplateView<RootViewModel> {
    constructor(value) {
        super(value);
    }

    render(t, vm: RootViewModel) {
        return t.mapView(vm => vm.activeSection, section => {
            (window as any).sendViewChangeToParent(section);
            switch (section) {
                case "login":
                    return new LoginView(vm.loginViewModel);
                case "settings":
                    return new SettingsView(vm.settingsViewModel);
                case "timeline":
                    return new ChatrixView(vm.chatrixViewModel);
            }
            return null;
        })
    }
}
