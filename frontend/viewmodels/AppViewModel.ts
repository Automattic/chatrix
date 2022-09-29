import { ViewModel } from "hydrogen-view-sdk";

export type AppViewModelMaker = (options: any) => AppViewModel;

export abstract class AppViewModel extends ViewModel {
    protected constructor(options: any) {
        super(options);
    }
}
