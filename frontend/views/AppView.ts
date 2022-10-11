import { AppViewModel } from "../viewmodels/AppViewModel";
import { TemplateView } from "hydrogen-web/src/platform/web/ui/general/TemplateView";

export type AppViewMaker = (viewModel: AppViewModel) => AppView;

export abstract class AppView extends TemplateView<AppViewModel> {
    protected constructor(value: AppViewModel) {
        super(value);
    }

    // @ts-ignore
    public abstract render(t, vm: AppViewModel): any;
}
