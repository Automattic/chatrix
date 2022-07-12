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
import { LoginViewModel } from "../../viewmodels/LoginViewModel";
import { LoadingView } from "./LoadingView";
import { FooterView } from "./FooterView";

export class LoginView extends TemplateView<LoginViewModel> {
    constructor(value) {
        super(value);
    }

    render(t, vm: LoginViewModel) {
        return t.div(
            { className: "LoginView" },
            [
                t.view(new LoadingView()),
                t.view(new FooterView(vm.footerViewModel)),
            ]
        );
    }
}