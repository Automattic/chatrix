import { IframeParams, IframeUrl } from "../../../components/chat";
import { Iframe } from "../../../parent/iframe";
import { containerClass } from "../../../parent/util";
import { StartButton } from "./button";

export class Popup {
    private startButton: StartButton;
    private iframe: Iframe;
    private readonly container: Element;
    private isFrameLoaded: boolean;

    constructor(containerId: string, hostRoot: string, params: IframeParams) {
        const container = document.querySelector(`#${containerId}`);
        if (!container) {
            throw new Error(`Container was not found: ${containerId}`);
        }

        this.container = container;
        this.startButton = new StartButton(() => {
            this.startButtonClicked();
        });

        const iframeUrl = new IframeUrl(hostRoot, params);
        this.isFrameLoaded = false;
        this.iframe = new Iframe(iframeUrl);

        this.container.className = containerClass();
        this.startButton.mount(this.container.id);

        if (iframeUrl.hasLoginToken()) {
            // Simulate a click on the start button so that we can complete the SSO flow.
            this.startButton.active = true;
            this.startButtonClicked();
        }
    }

    private startButtonClicked(): void {
        if (this.startButton.active && !this.isFrameLoaded) {
            this.iframe.mount(this.container.id);
            this.isFrameLoaded = true;
        }

        this.iframe.visible = this.startButton.active;
    }
}
