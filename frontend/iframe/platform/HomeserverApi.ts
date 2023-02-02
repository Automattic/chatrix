import { HomeServerApi as BaseHomeserverApi } from "hydrogen-web/src/matrix/net/HomeServerApi";
import { RequestFunction } from "hydrogen-web/src/platform/types/types";

type Options = {
    homeserver: string;
    request: RequestFunction;
};

export class HomeserverApi extends BaseHomeserverApi{
    constructor(options: Options) {
        super({
            ...options,
            // @ts-ignore
            reconnector: null,
        });
    }
}
