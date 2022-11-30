import { useFocusableIframe } from "@wordpress/compose";
import { WPElement } from "@wordpress/element";
import { IframeParams, IframeUrl } from "../frontend/parent/iframe";
import { containerClass, iframeClass } from "../frontend/parent/util";

export type IframeProps = {
    focusable: boolean,
    height: string,
    defaultHomeserver?: string,
    roomId?: string,
}

export default function IFrame(props: IframeProps): WPElement {
    const ref = props.focusable ? useFocusableIframe() : undefined;
    const style = {
        height: props.height || undefined,
    };

    const url = iframeUrl({
        defaultHomeserver: props.defaultHomeserver,
        roomId: props.roomId,
    });

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

function iframeUrl(params: IframeParams): string {
    const config = window.automattic_chatrix_block_config;
    if (!config) {
        throw new Error("Failed to initialize Chatrix block: window.automattic_chatrix_block_config is not defined");
    }

    const url = new IframeUrl(config.rootUrl, params);
    return url.toString();
}

declare global {
    interface Window {
        automattic_chatrix_block_config: {
            rootUrl: string;
        };
    }
}
