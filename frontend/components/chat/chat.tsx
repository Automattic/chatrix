import { useFocusableIframe } from "@wordpress/compose";
import { IframeUrl } from "../../parent/iframe";
import { iframeClass } from "../../parent/util";

export interface ChatProps {
    focusable?: boolean,
    hostRoot: string,
    defaultHomeserver?: string,
    roomId?: string,
}

export function Chat(props: ChatProps) {
    const ref = props.focusable ? useFocusableIframe() : undefined;

    const iframeUrl = new IframeUrl(props.hostRoot, {
        defaultHomeserver: props.defaultHomeserver,
        roomId: props.roomId,
    });

    return (
        <div className={"chatrix-component-chat"}>
            <iframe
                // @ts-ignore
                ref={ref}
                className={iframeClass()}
                src={iframeUrl.toString()}
            ></iframe>
        </div>
    );
}
