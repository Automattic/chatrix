import { useFocusableIframe } from "@wordpress/compose";
import { WPElement } from "@wordpress/element";
import { IframeUrl } from "../frontend/parent/iframe";
import { containerClass, iframeClass } from "../frontend/parent/util";

type Props = {
    focusable: boolean,
    attributes: any,
    height: string,
}

export default function IFrame(props: Props): WPElement {
    const ref = props.focusable ? useFocusableIframe() : undefined;
    const url = iframeUrl(props.attributes);
    const style = {
        height: props.height || undefined,
    };

    return (
        <div className={containerClass()} style={style}>
            <iframe className={iframeClass()}
                // @ts-ignore
                ref={ref}
                src={url}
            ></iframe>
        </div>
    );
}

function iframeUrl(attributes): string {
    const config = window.automattic_chatrix_block_config;
    if (!config) {
        throw new Error("Failed to initialize Chatrix block: window.automattic_chatrix_block_config is not defined");
    }

    const url = new IframeUrl(config.rootUrl, attributes);
    return url.toString();
}

declare global {
    interface Window {
        automattic_chatrix_block_config: {
            rootUrl: string;
        };
    }
}
