import { BlockProps, renderBlock } from "../app";

declare global {
    interface Window {
        ChatrixBlockConfig: {
            containerId: string,
            attributes: object,
        };
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const config = window.ChatrixBlockConfig;
    if (!config) {
        throw "ChatrixBlockConfig is not defined";
    }

    const containerId = config.containerId;
    const container = document.getElementById(containerId);
    if (!container) {
        throw `element with id ${containerId} was not found`;
    }

    const props: BlockProps = {
        attributes: config.attributes,
    };

    renderBlock(containerId, props);
});
