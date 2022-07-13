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
import {PasswordLoginViewModel} from "../../viewmodels/PasswordLoginViewModel";

export class PasswordLoginView extends TemplateView<LoginViewModel> {
    constructor(value) {
        super(value);
    }

    render(t, vm: PasswordLoginViewModel) {
        const username = t.input({
            id: "username",
            type: "text",
            placeholder: vm.i18n`Username`,
            disabled: "disabled"
        });
        const password = t.input({
            id: "password",
            type: "password",
            placeholder: vm.i18n`Password`,
            disabled: "disabled"
        });
        const submit = t.button({
            className: "button-action primary",
            type: "submit",
            disabled: "disabled"
        }, vm.i18n`Log In`);

        return t.div({ className: "PasswordLoginView" }, [
            t.form({
                onSubmit: evnt => {
                    evnt.preventDefault();
                    // TODO
                }
            }, [
                t.if(vm => vm.errorMessage, (t, vm) => t.p({className: "error"}, vm.i18n(vm.errorMessage))),
                t.div({ className: "form-row text" }, [t.label({ for: "username" }, vm.i18n`Username`), username]),
                t.div({ className: "form-row text" }, [t.label({ for: "password" }, vm.i18n`Password`), password]),
                t.div({ className: "button-row" }, [submit]),
            ])
        ]);
    }
}