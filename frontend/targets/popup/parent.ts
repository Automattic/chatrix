import { createElement, render } from '@wordpress/element';
import { ChatProps } from "../../components/Chat";
import { Popup } from "../../components/Popup";

export function init(containerId: string, props: ChatProps) {
    const element = createElement(Popup, props);
    render(element, document.getElementById(containerId));
}
