import { containerClass, iframeClass } from "./util";

export type IframeParams = {
    defaultHomeserver: string
    roomId: string,
}

export class Iframe {
    private readonly _url: string;
    private readonly iframe: HTMLIFrameElement;

    constructor(hostRoot: string, params: IframeParams) {
        this._url = this.makeUrl(hostRoot, params);

        this.iframe = document.createElement("iframe");
        this.iframe.src = this.url;
        this.iframe.className = iframeClass();
    }

    public get url(): string {
        return this._url;
    }

    public set visible(value: boolean) {
        if (value) {
            this.iframe.style.display = "block";
        } else {
            this.iframe.style.display = "none";
        }
    }

    public mount(containerId: string): void {
        const container = document.querySelector(`#${containerId}`);
        if (!container) {
            throw new Error(`Container for iframe was not found: ${containerId}`);
        }

        container.className = containerClass();
        container.appendChild(this.iframe);
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
