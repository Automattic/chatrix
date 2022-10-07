import { URLRouter as BaseURLRouter } from "hydrogen-web/src/domain/navigation/URLRouter";
import { SegmentType } from "hydrogen-web/src/domain/navigation";

export class URLRouter extends BaseURLRouter<SegmentType> {
    createSSOCallbackURL(): string {
        // The URL of the iframe's parent.
        return parent.location.href;
    }
}
