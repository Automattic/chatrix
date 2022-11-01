import { Iframe, IframeParams } from "../../parent/iframe";
import { StartButton } from "./button";

(window as any).AutomatticChatrixPopup = {
    iframe: null,
};

export function loadStartButton(containerId: string, hostRoot: string, params: IframeParams): void {
    const button = new StartButton(() => {
        if (!isIframeLoaded()) {
            const iframe = new Iframe(hostRoot, params);
            iframe.mount(containerId);
            (window as any).AutomatticChatrixPopup.iframe = iframe;
        } else {
        }
    });
    button.mount(containerId);
}


function isIframeLoaded(): boolean {
    return (window as any).AutomatticChatrixPopup.iframe !== null;
}
