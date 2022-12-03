import { IframeUrl } from "../components/chat";
import { containerClass, iframeClass } from "./util";

export class Iframe {
    private readonly iframe: HTMLIFrameElement;

    constructor(url: IframeUrl) {
        this.iframe = document.createElement("iframe");
        this.iframe.src = url.toString();
        this.iframe.className = iframeClass();
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
