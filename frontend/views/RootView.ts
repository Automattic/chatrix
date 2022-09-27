import { TemplateView } from "hydrogen-view-sdk";
import { RootViewModel, Section } from "../viewmodels/RootViewModel";
import { LoginView } from "./LoginView";
import { Builder } from "hydrogen-view-sdk/types/platform/web/ui/general/TemplateView";

export class RootView extends TemplateView<RootViewModel> {
    constructor(value: RootViewModel) {
        super(value);
    }

    render(t: Builder<RootViewModel>, vm: RootViewModel) {
        // @ts-ignore
        return t.mapView(vm => vm.activeSection, (section: Section) => {
                switch (section) {
                    case Section.Login:
                        if (vm.loginViewModel) return new LoginView(vm.loginViewModel);
                }
                return null;
            }
        );
    }
}
