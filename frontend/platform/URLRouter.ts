import { SegmentType } from "hydrogen-web/src/domain/navigation";
import { URLRouter as BaseURLRouter } from "hydrogen-web/src/domain/navigation/URLRouter";

export class URLRouter extends BaseURLRouter<SegmentType> {
    createSSOCallbackURL(): string {
        // The URL of the iframe's parent.
        return parent.location.href;
    }

    normalizeUrl(): void {
        // Remove query params from iframe URL.
        super.normalizeUrl();

        // Remove loginToken query param from iframe parent's URL.
        const urlParams = new URLSearchParams(parent.location.search);
        urlParams.delete("loginToken");
        parent.history.replaceState(null, '', (urlParams.entries.length ? '?' + urlParams : './') + location.hash);
    }
}
