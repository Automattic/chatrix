import { createElement, render } from '@wordpress/element';
import { Chat, ChatProps } from "../../components/Chat";

export function init(containerId: string, props: ChatProps) {
    const element = createElement(Chat, props);
    render(element, document.getElementById(containerId));
}
