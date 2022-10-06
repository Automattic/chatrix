import { Options, ViewModel } from "hydrogen-web/src/domain/ViewModel";
import { SegmentType } from "hydrogen-web/src/domain/navigation";

export type AppViewModelMaker = (options: any) => AppViewModel;

export abstract class AppViewModel extends ViewModel<SegmentType, Options> {
    protected constructor(options: Options) {
        super(options);
    }
}
