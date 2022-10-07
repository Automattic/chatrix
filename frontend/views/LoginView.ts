import { LoginView as BaseLoginView } from "hydrogen-web/src/platform/web/ui/login/LoginView";
import { LoginViewModel } from "../viewmodels/login/LoginViewModel";

export class LoginView extends BaseLoginView {
    constructor(value: LoginViewModel) {
        super(value);
    }
}
