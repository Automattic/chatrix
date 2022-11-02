import { Iframe, IframeParams } from "../../../parent/iframe";
import { containerClass } from "../../../parent/util";
import { StartButton } from "./button";

export class Popup {
    private startButton: StartButton;
    private iframe: Iframe;
    private readonly container: Element;

    constructor(containerId: string, hostRoot: string, params: IframeParams) {
        const container = document.querySelector(`#${containerId}`);
        if (!container) {
            throw new Error(`Container was not found: ${containerId}`);
        }

        this.container = container;
        this.startButton = new StartButton(() => {
            this.startButtonClick();
        });
        this.iframe = new Iframe(hostRoot, params);

        this.container.className = containerClass();
        this.startButton.mount(this.container.id);
    }

    private startButtonClick(): void {
        this.iframe.mount(this.container.id);
        this.iframe.visible = true;
        this.startButton.visible = false;
    }
}
