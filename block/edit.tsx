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
    const win: Window = window as Window;
    const config: BlockConfig = win.chatrix_block_config;
    const iframeTitle = `${blockProps["data-title"]} iframe`;

    const iframeSrc = addQueryArgs(config.iframeUrl, {
        defaultHomeserver: attributes.defaultHomeserver,
    });

    return (
        <div {...blockProps}>
            <Inspector
                attributes={attributes}
                setAttributes={setAttributes}
            />
            <iframe className="wp-block-automattic-chatrix-iframe"
                    title={iframeTitle}
                    src={iframeSrc}
            ></iframe>
        </div>
    );
}
