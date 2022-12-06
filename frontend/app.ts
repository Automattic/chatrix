import { BlockProps } from "./components/block";

import { render as renderBlockInternal } from "./components/block/render";
import { PopupProps } from "./components/popup";
import { render as renderPopupInternal } from "./components/popup/render";

export function renderBlock(containerId: string, props: BlockProps) {
    props.iframeUrl = getIframeUrl();
    return renderBlockInternal(containerId, props);
}

export function renderPopup(containerId: string, props: PopupProps) {
    props.iframeUrl = getIframeUrl();
    return renderPopupInternal(containerId, props);
}

export function getIframeUrl(): URL {
    let rootUrl = window.origin;
    const config = window.ChatrixConfig ?? null;
    if (config && config.rootUrl) {
        rootUrl = config.rootUrl;
    }

    return new URL("iframe.html", rootUrl);
}

declare global {
    interface Window {
        ChatrixConfig: {
            rootUrl: string;
        };
    }
}
