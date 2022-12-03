import { createElement, render } from '@wordpress/element';
import { Popup, PopupProps } from "../../components/popup";

export function init(containerId: string, props: PopupProps) {
    const element = createElement(Popup, props);
    render(element, document.getElementById(containerId));
}
