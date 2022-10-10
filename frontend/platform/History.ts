import { History as BaseHistory } from "hydrogen-web/src/platform/web/dom/History";

export class History extends BaseHistory {
    private _lastSessionHash: string | null | undefined;

    constructor() {
        super();
    }

    onSubscribeFirst() {
        this._lastSessionHash = window.localStorage?.getItem("chatrix_last_url_hash");
        // @ts-ignore
        window.addEventListener('hashchange', this);
    }

    _storeHash(hash) {
        window.localStorage?.setItem("chatrix_last_url_hash", hash);
    }
}
