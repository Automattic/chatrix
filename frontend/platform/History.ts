import { History as BaseHistory } from "hydrogen-web/src/platform/web/dom/History";

export class History extends BaseHistory {
    private _lastSessionHash: string | null | undefined;

    constructor() {
        super();
    }

    get() {
        /*
        All URLS in Hydrogen will use <root>/#/segment/value/...
        But for SSO, we need to handle <root>/?loginToken=<TOKEN>
        Handle that as a special case for now.
        */
        if (window.location.search.includes("loginToken")) {
            return window.location.search;
        }

        return window.location.hash;
    }

    onSubscribeFirst() {
        this._lastSessionHash = window.localStorage?.getItem("chatrix_last_url_hash");
        // @ts-ignore
        window.addEventListener('hashchange', this);
    }

    _storeHash(hash) {
        window.localStorage?.setItem("chatrix_last_url_hash", hash);
    }

    replaceUrlSilently(url) {
        super.replaceUrlSilently(url);
    }
}
