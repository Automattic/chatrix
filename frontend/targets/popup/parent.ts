import { Iframe, IframeParams } from "../../parent/iframe";
import { containerClass } from "../../parent/util";
import "./parent.css";
import { StartButton } from "./src/button";

export function loadStartButton(containerId: string, hostRoot: string, params: IframeParams): void {
    const container = document.createElement("div");
    container.id = containerId;
    container.className = containerClass();
    document.body.appendChild(container);

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
