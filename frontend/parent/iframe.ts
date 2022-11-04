import { containerClass, iframeClass } from "./util";

export type IframeParams = {
    defaultHomeserver: string
    roomId: string,
}

export class IframeUrl {
    private readonly url: URL;

    constructor(hostRoot: string, params: IframeParams) {
        this.url = new URL("index.html?", hostRoot);

        for (let key in params) {
            if (!!params[key]) {
                this.url.searchParams.append(key, params[key]);
            }
        }

        this.applyLoginToken();
    }

    public toString(): string {
        return this.url.toString();
    }

    private applyLoginToken(paramName = "loginToken"): void {
        const queryParams = new URLSearchParams(window.location.search);

        if (queryParams.has(paramName)) {
            this.url.searchParams.append(
                paramName,
                queryParams.get(paramName) ?? ""
            );
        }
    }
}

export class Iframe {
    private readonly _url: IframeUrl;
    private readonly iframe: HTMLIFrameElement;

    constructor(hostRoot: string, params: IframeParams) {
        this._url = new IframeUrl(hostRoot, params);

        this.iframe = document.createElement("iframe");
        this.iframe.src = this.url;
        this.iframe.className = iframeClass();
    }

    public get url(): string {
        return this._url.toString();
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
}
