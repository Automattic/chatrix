import { IframeUrl } from "../parent/iframe";
import { containerClass, iframeClass } from "../parent/util";

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
        <div className={containerClass()}>
            <iframe
                className={iframeClass()}
                src={iframeUrl.toString()}
            ></iframe>
        </div>
    );
}
