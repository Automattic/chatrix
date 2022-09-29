import { TemplateView } from "hydrogen-view-sdk";
import { LoginViewModel } from "../viewmodels/LoginViewModel";

export class LoginView extends TemplateView<LoginViewModel> {
    constructor(value: LoginViewModel) {
        super(value);
    }

    // @ts-ignore
    render(t, vm: LoginViewModel) {
        return t.div({ className: "LoginView" }, []);
    }
}
