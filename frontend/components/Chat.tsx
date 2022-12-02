import { IframeUrl } from "../parent/iframe";
import { iframeClass } from "../parent/util";

export interface ChatProps {
    hostRoot: string,
    defaultHomeserver?: string,
    roomId?: string,
}

export function Chat(props: ChatProps) {
    const iframeUrl = new IframeUrl(props.hostRoot, {
        defaultHomeserver: props.defaultHomeserver,
        roomId: props.roomId,
    });

    return (
        <div className={"chatrix-component-chat"}>
            <iframe
                className={iframeClass()}
                src={iframeUrl.toString()}
            ></iframe>
        </div>
    );
}
