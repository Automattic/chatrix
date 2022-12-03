import { createElement, render as renderElement } from "@wordpress/element";
import { Popup, PopupProps } from "./popup";
import './style.scss';

export function render(containerId: string, props: PopupProps) {
    const element = createElement(Popup, props);
    renderElement(element, document.getElementById(containerId));
}
