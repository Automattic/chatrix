import { TemplateView } from "hydrogen-view-sdk";
import { LoadingViewModel } from "../viewmodels/LoadingViewModel";

export class LoadingView extends TemplateView<LoadingViewModel> {
    constructor(value: LoadingViewModel) {
        super(value);
    }

    // @ts-ignore
    render(t, vm: LoadingViewModel) {
        return t.div({ className: "LoadingView" }, []);
    }
}
