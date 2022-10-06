import { TemplateView } from "hydrogen-view-sdk";
import { RootViewModel } from "../viewmodels/RootViewModel";
import { AppViewMaker } from "./AppView";
import { LoginView } from "./LoginView";
import { Section } from "../main";
import "hydrogen-view-sdk/style.css";

export class RootView extends TemplateView<RootViewModel> {
    private readonly _appViewMaker: AppViewMaker;

    constructor(value: RootViewModel, appViewMaker: AppViewMaker) {
        super(value);
        this._appViewMaker = appViewMaker;
    }

    // @ts-ignore
    render(t, vm: RootViewModel) {
        // @ts-ignore
        return t.mapView(vm => vm.activeSection, (section: Section) => {
                switch (section) {
                    case Section.Login:
                        if (vm.loginViewModel) return new LoginView(vm.loginViewModel);
                        break;
                    case Section.App:
                        if (vm.appViewModel) return this._appViewMaker(vm.appViewModel);
                        break;
                }
                return null;
            }
        );
    }
}
