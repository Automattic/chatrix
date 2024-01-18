import { useFocusableIframe } from "@wordpress/compose";
import { IframeUrl } from "./url";

export interface ChatProps {
    focusable?: boolean,
    iframeUrl: URL,
    instanceId: string,
    defaultHomeserver?: string,
    roomId?: string,
    enableServiceWorker?: boolean,
}

export function Chat(props: ChatProps) {
    const {
        focusable,
        iframeUrl,
        instanceId,
        defaultHomeserver,
        roomId,
        enableServiceWorker,
    } = props;

    const ref = focusable ? useFocusableIframe() : undefined;
    const url = new IframeUrl(iframeUrl, {
        instanceId,
        defaultHomeserver,
        roomId,
        enableServiceWorker,
    });

    return (
        <div className={"chatrix-component-chat"}>
            <iframe
                // @ts-ignore
                ref={ref}
                src={url.toString()}
            ></iframe>
        </div>
    );
}
