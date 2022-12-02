import { createElement, render } from '@wordpress/element';
import { Block, BlockProps } from "../../components/block";

export function init(containerId: string, props: BlockProps) {
    const element = createElement(Block, props);
    render(element, document.getElementById(containerId));
}
