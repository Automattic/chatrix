import { useBlockProps } from "@wordpress/block-editor";
import { WPElement } from '@wordpress/element';
import { addQueryArgs } from "@wordpress/url";
import './editor.scss';
import Inspector from "./inspector";

// Config coming from PHP.
type BlockConfig = {
    iframeUrl: string,
}

type Window = {
    chatrix_block_config: BlockConfig,
} & typeof window;

export default function Edit({ attributes, setAttributes }): WPElement {
    const blockProps = useBlockProps();
    const iframeTitle = `${blockProps["data-title"]} iframe`;
    const iframeUrl = makeIframeUrl(attributes);

    return (
        <div {...blockProps}>
            <Inspector
                attributes={attributes}
                setAttributes={setAttributes}
            />
            <iframe className="wp-block-automattic-chatrix-iframe"
                    title={iframeTitle}
                    src={iframeUrl}
            ></iframe>
        </div>
    );
}

function makeIframeUrl(attributes): string {
    const win: Window = window as Window;
    const config: BlockConfig = win.chatrix_block_config;
    const queryArgs = new URLSearchParams(window.location.search);

    const iframeQueryArgs: { [key: string]: any } = {
        defaultHomeserver: attributes.defaultHomeserver,
    };

    if (queryArgs.has("loginToken")) {
        iframeQueryArgs.loginToken = queryArgs.get("loginToken");
    }

    return addQueryArgs(config.iframeUrl, iframeQueryArgs);
}
