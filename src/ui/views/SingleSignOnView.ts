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
import {SingleSignOnViewModel} from "../../viewmodels/SingleSignOnViewModel";

export class SingleSignOnView extends TemplateView<SingleSignOnViewModel> {
    constructor(value) {
        super(value);
    }

    render(t, vm: SingleSignOnViewModel) {
       return t.div({ className: "SingleSignOnView" }, [
            t.if(vm => vm.errorMessage, (t, vm) => t.p({className: "error"}, vm.i18n(vm.errorMessage))),
            t.button({
                className: "SingleSignOnView_button button-action primary",
                type: "button",
                onClick: () => vm.beginSSO(),
                disabled: vm => vm.isBusy
            }, vm.i18n`Log in with SSO`)
        ] );
    }
}
