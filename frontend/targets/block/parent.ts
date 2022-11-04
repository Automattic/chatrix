import { Iframe, IframeParams, IframeUrl } from "../../parent/iframe";

export function loadIframe(containerId: string, hostRoot: string, params: IframeParams): void {
    const iframe = new Iframe(new IframeUrl(hostRoot, params));
    iframe.mount(containerId);
}
