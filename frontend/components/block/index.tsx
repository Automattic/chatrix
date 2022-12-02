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
    const config = window.automattic_chatrix_block_config;
    if (!config) {
        throw new Error("Failed to initialize Chatrix block: window.automattic_chatrix_block_config is not defined");
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
        hostRoot: config.rootUrl,
        defaultHomeserver: attributes.defaultHomeserver,
        roomId: attributes.roomId,
    };

    return (
        <div className={"chatrix-component-block"} style={style}>
            <Chat {...chatProps}/>
        </div>
    );
}
