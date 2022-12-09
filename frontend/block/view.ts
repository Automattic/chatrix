import { BlockProps, renderBlock } from "../app";

window.addEventListener('DOMContentLoaded', () => {
    const elements = document.getElementsByClassName("wp-block-automattic-chatrix");
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
