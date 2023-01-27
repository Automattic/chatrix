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
    renderAllBlocks().catch(error => {
        console.error(error);
    });
});

async function renderAllBlocks() {
    // See https://github.com/Automattic/chatrix/issues/161 for why we introduce a delay here.
    await introduceDelayInMilliseconds(1);

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

    renderBlock(document.getElementById(containerId), props);
}

async function introduceDelayInMilliseconds(delay: number) {
    return new Promise(resolve => setTimeout(resolve, delay));
}
