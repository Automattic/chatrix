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

    const props: BlockProps = {
        attributes: config.attributes,
    };

    const containers = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('wp-block-automattic-chatrix');
    for (const container of containers) {
        renderBlock(container, props);

        // TODO: Support multiple blocks on the same page.
        break;
    }
}

async function introduceDelayInMilliseconds(delay: number) {
    return new Promise(resolve => setTimeout(resolve, delay));
}
