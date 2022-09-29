import { TemplateView } from "hydrogen-view-sdk";
import { Builder } from "hydrogen-view-sdk/types/platform/web/ui/general/TemplateView";
import { LoadingViewModel } from "../viewmodels/LoadingViewModel";

export class LoadingView extends TemplateView<LoadingViewModel> {
    constructor(value: LoadingViewModel) {
        super(value);
    }

    // @ts-ignore
    render(t: Builder<LoadingViewModel>, vm: LoadingViewModel) {
        return t.div({ className: "LoadingView" }, []);
    }
}
