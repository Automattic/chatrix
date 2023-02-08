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

    async resolveRoomAlias(idOrAlias: string): Promise<string> {
        // If idOrAlias is an id, there's nothing for us to do.
        if (idOrAlias.startsWith("!")) {
            return idOrAlias;
        }

        // @ts-ignore
        const url = this._url("/directory/room/" + encodeURIComponent(idOrAlias));

        // @ts-ignore
        const request = this._unauthedRequest("GET", url);

        const data = await request.response();
        return data["room_id"];
    }
}
