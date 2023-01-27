import { BlockProps, renderBlock } from "../app";

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
        const config = getConfigFromDataElement(container);
        const props: BlockProps = {
            attributes: config.attributes,
        };

        renderBlock(container, props);

        // TODO: Support multiple blocks on the same page.
        break;
    }
}

/**
 * The container element has a single <span> child that contains the config as a data-attribute.
 * This function parses that data-attribute into an object.
 */
function getConfigFromDataElement(container: HTMLElement): BlockConfig {
    const dataElement = container.getElementsByTagName('span').item(0);
    if (!dataElement) {
        throw "Data element for chatrix block was not found";
    }

    const dataString = decodeURIComponent(dataElement.dataset?.chatrixBlockConfig ?? '');
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
