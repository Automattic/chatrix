import { containerClass, iframeClass } from "./util";

export type IframeParams = {
    defaultHomeserver: string
    roomId: string,
}

export class Iframe {
    private readonly _url: string;

    constructor(hostRoot: string, params: IframeParams) {
        this._url = this.makeUrl(hostRoot, params);
    }

    public get url(): string {
        return this._url;
    }

    public mount(containerId: string): HTMLIFrameElement {
        const container = document.querySelector(`#${containerId}`);
        if (!container) {
            throw new Error(`Container for iframe was not found: ${containerId}`);
        }

        const iframe = document.createElement("iframe");
        iframe.src = this.url;
        iframe.className = iframeClass();

        container.className = containerClass();
        container.appendChild(iframe);

        return iframe;
    }

    private makeUrl(rootUrl: string, params: IframeParams): string {
        const url = new URL("index.html?", rootUrl);
        const queryParams = new URLSearchParams(window.location.search);

        if (queryParams.has("loginToken")) {
            // @ts-ignore
            params.loginToken = queryParams.get("loginToken");
        }

        for (let key in params) {
            if (!!params[key]) {
                url.searchParams.append(key, params[key]);
            }
        }

        return url.toString();
    }
}
