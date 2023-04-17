import { Chat, ChatProps } from "../chat";
import { BlockAttributes } from "./attributes";

export interface BlockProps {
    focusable?: boolean,
    attributes: BlockAttributes,
    iframeUrl: URL,
}

export function Block(props: BlockProps) {
    const { focusable, iframeUrl } = props;
    const {
        instanceId,
        defaultHomeserver,
        roomId,
        height,
        borderWidth,
        borderRadius,
        borderStyle,
        borderColor,
    } = props.attributes;

    const style = {
        height: height ? height.toString() : '',
        borderWidth: borderWidth ? borderWidth.toString() : 0,
        borderRadius: borderRadius ? borderRadius.toString() : "",
        borderStyle: borderStyle ?? '',
        borderColor: borderColor ?? '',
    };

    const chatProps: ChatProps = {
        focusable,
        iframeUrl,
        instanceId,
        defaultHomeserver,
        roomId,
    };

    return (
        <div className={"chatrix-component-block"} style={style}>
            <Chat {...chatProps}/>
        </div>
    );
}
