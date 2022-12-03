import { createElement, render as renderElement } from "@wordpress/element";
import { Block, BlockProps } from "./block";

export function render(containerId: string, props: BlockProps) {
    const element = createElement(Block, props);
    renderElement(element, document.getElementById(containerId));
}
