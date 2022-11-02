import { Iframe, IframeParams } from "../../parent/iframe";
import { containerClass } from "../../parent/util";
import "./parent.css";
import { StartButton } from "./src/button";

export function loadPopup(containerId: string, hostRoot: string, params: IframeParams): void {
    const container = document.querySelector(`#${containerId}`);
    if (!container) {
        throw new Error(`Container was not found: ${containerId}`);
    }

    container.className = containerClass();

    const button = new StartButton(() => {
        if (!isIframeLoaded()) {
            const iframe = new Iframe(hostRoot, params);
            iframe.mount(containerId);
            window.AutomatticChatrixPopupState.iframe = iframe;
        } else {
            // TODO
        }
    });
    button.mount(containerId);
}

function isIframeLoaded(): boolean {
    return !!window.AutomatticChatrixPopupState.iframe;
}

window.AutomatticChatrixPopupState = {
    iframe: undefined,
};

declare global {
    interface Window {
        AutomatticChatrixPopupState: {
            iframe?: Iframe;
        };
    }
}
