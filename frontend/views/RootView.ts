import { TemplateView } from "hydrogen-view-sdk";
import { RootViewModel } from "../viewmodels/RootViewModel";
import { LoginView } from "./LoginView";
import { Builder } from "hydrogen-view-sdk/types/platform/web/ui/general/TemplateView";
import { AppViewMaker } from "./AppView";
import { Section } from "../main";

export class RootView extends TemplateView<RootViewModel> {
    private _appViewMaker: AppViewMaker;

    constructor(value: RootViewModel, appViewMaker: AppViewMaker) {
        super(value);
        this._appViewMaker = appViewMaker;
    }

    render(t: Builder<RootViewModel>, vm: RootViewModel) {
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
