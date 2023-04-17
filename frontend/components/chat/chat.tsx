import { useFocusableIframe } from "@wordpress/compose";
import { IframeUrl } from "./url";

export interface ChatProps {
    focusable?: boolean,
    iframeUrl: URL,
    instanceId: string,
    defaultHomeserver?: string,
    roomId?: string,
}

export function Chat(props: ChatProps) {
    const {
        focusable,
        iframeUrl,
        instanceId,
        defaultHomeserver,
        roomId
    } = props;

    const ref = focusable ? useFocusableIframe() : undefined;
    const url = new IframeUrl(iframeUrl, {
        instanceId,
        defaultHomeserver,
        roomId,
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
