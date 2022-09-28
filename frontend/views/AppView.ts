import { TemplateView } from "hydrogen-view-sdk";
import { AppViewModel } from "../viewmodels/AppViewModel";
import { Builder } from "hydrogen-view-sdk/types/platform/web/ui/general/TemplateView";

export type AppViewMaker = (viewModel: AppViewModel) => AppView;

export abstract class AppView extends TemplateView<AppViewModel> {
    protected constructor(value: AppViewModel) {
        super(value);
    }

    public abstract render(t: Builder<AppViewModel>, vm: AppViewModel): any;
}
