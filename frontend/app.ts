import { BlockConfiguration, getBlockAttributes, registerBlockType } from "@wordpress/blocks";
import { createElement, render } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import metadata from "./block/block.json";
import Edit from "./block/edit";
import Save from "./block/save";
import { Block, BlockProps as BaseBlockProps, fromDataAttributes } from "./components/block";
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
            // console.log(element.outerHTML);
            // console.log(parse(`wp:automattic/chatrix ${element.outerHTML} /wp:automattic/chatrix `));

            const name: string = metadata.name;
            const configuration: BlockConfiguration = {
                title: metadata.title,
                description: __("Matrix client", "chatrix"),
                category: metadata.category,
                attributes: metadata.attributes,
                edit: Edit,
                save: Save,
            };

            registerBlockType(name, configuration);

            // console.log(getBlockAttributes("automattic/chatrix", `<!-- wp:automattic/chatrix -->${element.outerHTML}<!-- /wp:automattic/chatrix -->`));
            console.log(getBlockAttributes("automattic/chatrix", document.body.innerHTML));

            const dataElement = <HTMLSpanElement>element.getElementsByTagName("span")[0];
            if (!dataElement) {
                throw "Span data element not found";
            }
            const attributes = fromDataAttributes(dataElement.dataset);
            renderBlock(element, { attributes });
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
