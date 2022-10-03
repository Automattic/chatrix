import { Options, ViewModel } from "./ViewModel";

export type AppViewModelMaker = (options: any) => AppViewModel;

export abstract class AppViewModel extends ViewModel {
    protected constructor(options: Options) {
        super(options);
    }
}
