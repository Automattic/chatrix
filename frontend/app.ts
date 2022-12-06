import { BlockProps as BaseBlockProps } from "./components/block";
import { render as renderBlockInternal } from "./components/block/render";
import { PopupProps as BasePopupProps } from "./components/popup";
import { render as renderPopupInternal } from "./components/popup/render";

declare global {
    interface Window {
        ChatrixConfig: {
            rootUrl: string;
        };
    }
}

export type BlockProps = Omit<BaseBlockProps, "iframeUrl">;

export function renderBlock(containerId: string, props: BlockProps) {
    const blockProps: BaseBlockProps = {
        ...props,
        iframeUrl: getIframeUrl(),
    };

    return renderBlockInternal(containerId, blockProps);
}

export type PopupProps = Omit<BasePopupProps, "iframeUrl">;

export function renderPopup(containerId: string, props: PopupProps) {
    const popupProps: BasePopupProps = {
        ...props,
        iframeUrl: getIframeUrl(),
    };

    return renderPopupInternal(containerId, popupProps);
}

export function getIframeUrl(): URL {
    let rootUrl = window.origin;
    const config = window.ChatrixConfig ?? null;
    if (config && config.rootUrl) {
        rootUrl = config.rootUrl;
    }

    return new URL("iframe.html", rootUrl);
}
