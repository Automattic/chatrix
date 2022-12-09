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

export function renderAllBlocks(className: string) {
    window.addEventListener('DOMContentLoaded', () => {
        const elements = document.getElementsByClassName(className);
        Array.from(elements).forEach((element: HTMLDivElement) => {
            const dataset = element.dataset;
            if (!dataset.attributes) {
                throw "No attributes field found on chatrix div.";
            }

            const props: BlockProps = {
                attributes: JSON.parse(decodeURIComponent(dataset.attributes)),
            };

            renderBlock(element, props);
        });
    });
}

function renderBlock(container: HTMLDivElement, props: BlockProps) {
    const blockProps: BaseBlockProps = {
        ...props,
        iframeUrl: getIframeUrl(),
    };

    const element = createElement(Block, blockProps);
    render(element, container);
}

export type PopupProps = Omit<BasePopupProps, "iframeUrl">;

export function renderPopup(container: HTMLDivElement, props: PopupProps) {
    const popupProps: BasePopupProps = {
        ...props,
        iframeUrl: getIframeUrl(),
    };

    const element = createElement(Popup, popupProps);
    render(element, container);
}

export function getIframeUrl(): URL {
    let rootUrl = window.origin;
    const config = window.ChatrixConfig ?? null;
    if (config && config.rootUrl) {
        rootUrl = config.rootUrl;
    }

    return new URL("iframe.html", rootUrl);
}
