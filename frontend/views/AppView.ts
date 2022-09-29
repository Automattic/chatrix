import { TemplateView } from "hydrogen-view-sdk";
import { AppViewModel } from "../viewmodels/AppViewModel";

export type AppViewMaker = (viewModel: AppViewModel) => AppView;

export abstract class AppView extends TemplateView<AppViewModel> {
    protected constructor(value: AppViewModel) {
        super(value);
    }

    // @ts-ignore
    public abstract render(t, vm: AppViewModel): any;
}
