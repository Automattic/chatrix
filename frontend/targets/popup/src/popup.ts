import { Iframe, IframeParams } from "../../../parent/iframe";
import { containerClass } from "../../../parent/util";
import { StartButton } from "./button";

export class Popup {
    private button: StartButton;
    private iframe: Iframe;
    private readonly container: Element;
    private isIframeLoaded: boolean;

    constructor(containerId: string, hostRoot: string, params: IframeParams) {
        const container = document.querySelector(`#${containerId}`);
        if (!container) {
            throw new Error(`Container was not found: ${containerId}`);
        }

        this.container = container;
        this.isIframeLoaded = false;
        this.button = new StartButton(() => {
            this.startButtonClick();
        });
        this.iframe = new Iframe(hostRoot, params);

        this.container.className = containerClass();
        this.button.mount(this.container.id);
    }

    private startButtonClick() {
        if (!this.isIframeLoaded) {
            this.iframe.mount(this.container.id);
            this.isIframeLoaded = true;
        } else {
            // TODO
        }
    }
}
