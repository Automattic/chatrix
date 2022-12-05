import { Chat, ChatProps } from "../chat";
import { parseAttributes } from "./attributes";

export interface BlockProps {
    focusable?: boolean,
    attributes: object,
    iframeUrl: URL,
}

export function Block(props: BlockProps) {
    const attributes = parseAttributes(props.attributes);

    const style = {
        height: attributes.height ? attributes.height.toString() : '',
        borderWidth: attributes.borderWidth ? attributes.borderWidth.toString() : 0,
        borderRadius: attributes.borderRadius ? attributes.borderRadius.toString() : "",
        borderStyle: attributes.borderStyle ?? '',
        borderColor: attributes.borderColor ?? '',
    };

    const chatProps: ChatProps = {
        focusable: props.focusable,
        iframeUrl: props.iframeUrl,
        defaultHomeserver: attributes.defaultHomeserver,
        roomId: attributes.roomId,
    };

    return (
        <div className={"chatrix-component-block"} style={style}>
            <Chat {...chatProps}/>
        </div>
    );
}
