import { AppView as BaseAppView } from "../../views/AppView";
import { AppViewModel } from "./AppViewModel";
import { Builder } from "hydrogen-view-sdk/types/platform/web/ui/general/TemplateView";

export class AppView extends BaseAppView {
    constructor(vm: AppViewModel) {
        super(vm);
    }

    // @ts-ignore
    render(t: Builder<AppViewModel>, vm: AppViewModel) {
        return t.div({ className: "AppView" }, []);
    }
}
