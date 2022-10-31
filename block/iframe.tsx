import { useFocusableIframe } from "@wordpress/compose";
import { WPElement } from "@wordpress/element";

export default function IFrame({ attributes, focusable = false }): WPElement {
    const ref = focusable ? useFocusableIframe() : undefined;
    const url = iframeUrl(attributes);

    return (
        <div className="automattic-chatrix-container">
            <iframe className="automattic-chatrix-iframe"
                // @ts-ignore
                ref={ref}
                src={url}
            ></iframe>
        </div>
    );
}

declare global {
    interface Window {
        automattic_chatrix_block_config: {
            rootUrl: string;
        };
        AutomatticChatrix: {
            makeIframeUrl(rootUrl: string, params: {}): string
        }
    }
}

function iframeUrl(attributes) {
    const config = window.automattic_chatrix_block_config;
    if (!config) {
        throw new Error("Failed to initialize Chatrix block: window.automattic_chatrix_block_config is not defined");
    }

    return window.AutomatticChatrix.makeIframeUrl(config.rootUrl, attributes);
}
