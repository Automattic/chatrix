import { createElement, render } from '@wordpress/element';
import { ChatProps } from "../../components/Chat";
import { Popup } from "../../components/Popup";
import { IframeParams } from "../../parent/iframe";
import { Popup as PopupLegacy } from "./src/popup";

export function init(containerId: string, props: ChatProps) {
    const element = createElement(Popup, props);
    render(element, document.getElementById(containerId));
}

export function loadPopup(containerId: string, hostRoot: string, params: IframeParams): void {
    window.AutomatticChatrixPopup = new PopupLegacy(containerId, hostRoot, params);
}

declare global {
    interface Window {
        AutomatticChatrixPopup: PopupLegacy;
    }
}
