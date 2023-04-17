import { BlockProps, renderBlock } from "../app";
import { parseAttributes } from "../components/block";

window.addEventListener('DOMContentLoaded', () => {
    renderAllBlocks().catch(error => {
        console.error(error);
    });
});

async function renderAllBlocks() {
    // See https://github.com/Automattic/chatrix/issues/161 for why we introduce a delay here.
    await introduceDelayInMilliseconds(1);

    const containers = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('wp-block-automattic-chatrix');
    for (const container of containers) {
        const config = getConfigFromDataAttribute(container);
        const attributes = parseAttributes(config.attributes);
        const props: BlockProps = {
            attributes: attributes,
        };

        if (!attributes.instanceId) {
            // In earlier versions of the block, there was no instanceId attribute, so it can be undefined.
            console.warn('Chatrix block is missing the instanceId attribute. Re-save the page to fix this.');
        }

        renderBlock(container, props);
    }
}

/**
 * The container element has a data-attribute that contains the config as encoded data.
 * This function parses that data-attribute into an object.
 */
function getConfigFromDataAttribute(container: HTMLElement): BlockConfig {
    const dataString = decodeURIComponent(container.dataset?.chatrixBlockConfig ?? '');
    if (dataString === '') {
        throw "Data attribute for chatrix block was not found, or is empty";
    }

    return JSON.parse(dataString);
}

interface BlockConfig {
    attributes: object,
}

async function introduceDelayInMilliseconds(delay: number) {
    return new Promise(resolve => setTimeout(resolve, delay));
}
