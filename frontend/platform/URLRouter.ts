import { SegmentType } from "hydrogen-web/src/domain/navigation";
import { Navigation, Path, Segment } from "hydrogen-web/src/domain/navigation/Navigation";
import { URLRouter as BaseURLRouter } from "hydrogen-web/src/domain/navigation/URLRouter";
import { History } from "./History";

type ParseURLPath<SegmentType> = (urlPath: string, currentNavPath: Path<SegmentType>, defaultSessionId?: string) => Segment<SegmentType>[];
type StringifyPath<SegmentType> = (path: Path<SegmentType>) => string;

export class URLRouter extends BaseURLRouter<SegmentType> {
    private _hist: History;

    constructor(history: History, navigation: Navigation<SegmentType>, parseUrlPath: ParseURLPath<SegmentType>, stringifyPath: StringifyPath<SegmentType>) {
        super(history, navigation, parseUrlPath, stringifyPath);
        this._hist = history;
    }

    createSSOCallbackURL(): string {
        // TODO: Remove the call to encodeURIComponent() once https://github.com/vector-im/hydrogen-web/pull/911 has been merged,
        //       and a new release has been issued which contains that PR.
        //       Note that package.json hardcodes hydrogen's version, so it will need to be updated so that the new
        //       version is used.

        // The URL of the iframe's parent.
        return encodeURIComponent(parent.location.href);
    }

    normalizeUrl(): void {
        // Remove loginToken query parameter from the iframe's URL.
        let iframeUrl = this.removeLoginToken(window.location.pathname, window.location.search, window.location.hash);
        this._hist.replaceUrlSilently(iframeUrl);

        // Remove loginToken query parameter from the iframe's parent's URL.
        let parentUrl = this.removeLoginToken(parent.location.pathname, parent.location.search, parent.location.hash);
        parent.history.replaceState(null, '', parentUrl);
    }

    private removeLoginToken(path: string, search: string, hash: string): string {
        const urlParams = new URLSearchParams(search);
        urlParams.delete("loginToken");

        let url = path;
        if (urlParams.toString() !== "") {
            url += "?" + urlParams.toString();
        }

        return url + hash;
    }
}
