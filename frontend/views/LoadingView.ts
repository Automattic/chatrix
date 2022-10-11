import { LoadingViewModel } from "../viewmodels/LoadingViewModel";
import { TemplateView } from "hydrogen-web/src/platform/web/ui/general/TemplateView";

export class LoadingView extends TemplateView<LoadingViewModel> {
    constructor(value: LoadingViewModel) {
        super(value);
    }

    // @ts-ignore
    render(t, vm: LoadingViewModel) {
        return t.div({ className: "LoadingView" }, []);
    }
}
