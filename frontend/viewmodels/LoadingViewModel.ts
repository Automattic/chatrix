import { Options, ViewModel } from "hydrogen-web/src/domain/ViewModel";
import { SegmentType } from "hydrogen-web/src/domain/navigation";

export class LoadingViewModel extends ViewModel<SegmentType, Options> {
    constructor(options: Options) {
        super(options);
    }
}
