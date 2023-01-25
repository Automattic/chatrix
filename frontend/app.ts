import { createElement, render } from "@wordpress/element";
import { Block, BlockProps as BaseBlockProps } from "./components/block";
import { Popup, PopupProps as BasePopupProps } from "./components/popup";

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

    const element = createElement(Block, blockProps);
    setTimeout( function() {
        render(element, document.getElementById(containerId));
    }, 1 );
}

export type PopupProps = Omit<BasePopupProps, "iframeUrl">;

export function renderPopup(containerId: string, props: PopupProps) {
    const popupProps: BasePopupProps = {
        ...props,
        iframeUrl: getIframeUrl(),
    };

    const element = createElement(Popup, popupProps);
    render(element, document.getElementById(containerId));
}

export function getIframeUrl(): URL {
    let rootUrl = window.origin;
    const config = window.ChatrixConfig ?? null;
    if (config && config.rootUrl) {
        rootUrl = config.rootUrl;
    }

    return new URL("iframe.html", rootUrl);
}
