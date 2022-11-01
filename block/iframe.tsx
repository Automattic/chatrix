import { useFocusableIframe } from "@wordpress/compose";
import { WPElement } from "@wordpress/element";
import { Iframe } from "../frontend/parent/iframe";
import { containerClass, iframeClass } from "../frontend/parent/util";

export default function IFrame({ attributes, focusable = false }): WPElement {
    const ref = focusable ? useFocusableIframe() : undefined;
    const url = iframeUrl(attributes);

    return (
        <div className={containerClass()}>
            <iframe className={iframeClass()}
                // @ts-ignore
                ref={ref}
                src={url}
            ></iframe>
        </div>
    );
}

function iframeUrl(attributes) {
    const config = window.automattic_chatrix_block_config;
    if (!config) {
        throw new Error("Failed to initialize Chatrix block: window.automattic_chatrix_block_config is not defined");
    }

    const iframe = new Iframe(config.rootUrl, attributes);
    return iframe.url;
}

declare global {
    interface Window {
        automattic_chatrix_block_config: {
            rootUrl: string;
        };
    }
}
