import { containerClass, iframeClass } from "./util";

export type IframeParams = {
    defaultHomeserver: string
    roomId: string,
}

export class Iframe {
    private readonly _url: string;
    private readonly _element: HTMLIFrameElement;

    constructor(hostRoot: string, params: IframeParams) {
        this._url = this.makeUrl(hostRoot, params);

        this._element = document.createElement("iframe");
        this._element.src = this.url;
        this._element.className = iframeClass();
    }

    public get url(): string {
        return this._url;
    }

    public get element(): HTMLIFrameElement {
        return this._element;
    }

    public mount(containerId: string): void {
        const container = document.querySelector(`#${containerId}`);
        if (!container) {
            throw new Error(`Container for iframe was not found: ${containerId}`);
        }

        container.className = containerClass();
        container.appendChild(this._element);
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
