import { TemplateView } from "hydrogen-view-sdk";
import { Builder } from "hydrogen-view-sdk/types/platform/web/ui/general/TemplateView";
import { LoginViewModel } from "../viewmodels/LoginViewModel";

export class LoginView extends TemplateView<LoginViewModel> {
    constructor(value: LoginViewModel) {
        super(value);
    }

    render(t: Builder<LoginViewModel>, vm: LoginViewModel) {
        return t.div({ className: "LoginView" }, []);
    }
}
