import { Iframe, IframeParams } from "./iframe";

export function loadIframe(containerId: string, hostRoot: string, params: IframeParams): void {
    const iframe = new Iframe(hostRoot, params);
    iframe.mount(containerId);
}
