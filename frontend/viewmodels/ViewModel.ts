import { createRouter, Navigation, Platform, ViewModel as BaseViewModel } from "hydrogen-view-sdk";

export type Options = {
    platform: typeof Platform,
    navigation: typeof Navigation,
    urlCreator: ReturnType<typeof createRouter>,
    emitChange?: (params: any) => void;
}

export abstract class ViewModel extends BaseViewModel {
    protected constructor(options: Options) {
        super(options);
    }
}
