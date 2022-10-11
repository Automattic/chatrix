import { AppViewModel } from "./AppViewModel";
import { TemplateView } from "hydrogen-web/src/platform/web/ui/general/TemplateView";

export class AppView extends TemplateView<AppViewModel> {
    constructor(vm: AppViewModel) {
        super(vm);
    }

    // @ts-ignore
    render(t, vm: AppViewModel) {
        return t.div({ className: "AppView" }, [
            t.div({ className: "hello" }, "Imagine this is a Matrix client"),
        ]);
    }
}
