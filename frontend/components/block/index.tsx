import { Chat } from "../chat";
import { parseAttributes } from "./attributes";

declare global {
    interface Window {
        automattic_chatrix_block_config: {
            rootUrl: string;
        };
    }
}

export interface BlockProps {
    focusable?: boolean,
    attributes: object,
}

export function Block(props: BlockProps) {
    let rootUrl = window.origin;
    const config = window.automattic_chatrix_block_config;
    if (config && config.rootUrl) {
        rootUrl = config.rootUrl;
    }

    const attributes = parseAttributes(props.attributes);

    const style = {
        height: attributes.height ? attributes.height.toString() : '',
        borderWidth: attributes.borderWidth ? attributes.borderWidth.toString() : 0,
        borderRadius: attributes.borderRadius ? attributes.borderRadius.toString() : "",
        borderStyle: attributes.borderStyle ?? '',
        borderColor: attributes.borderColor ?? '',
    };

    const chatProps = {
        focusable: props.focusable,
        hostRoot: rootUrl,
        defaultHomeserver: attributes.defaultHomeserver,
        roomId: attributes.roomId,
    };

    return (
        <div className={"chatrix-component-block"} style={style}>
            <Chat {...chatProps}/>
        </div>
    );
}
