import { Platform as BasePlatform } from "hydrogen-web/src/platform/web/Platform";

export class Platform extends BasePlatform {
    constructor(options) {
        super(options);
    }

    openUrl(url) {
        // Redirect the iframe's parent to the target url.
        console.log(`Redirecting to ${url}`);
        parent.location.href = url;
    }
}
