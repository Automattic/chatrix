import { useBlockProps } from "@wordpress/block-editor";
import { ResizableBox } from "@wordpress/components";
import { WPElement } from '@wordpress/element';
import { Chat, ChatProps } from "../frontend/components/chat";
import { Attributes, BorderRadius, BorderWidth, Height } from "../frontend/components/chat/attributes";
import './editor.scss';
import InspectorControls from "./inspector/InspectorControls";

declare global {
    interface Window {
        automattic_chatrix_block_config: {
            rootUrl: string;
        };
    }
}

interface Props {
    attributes: object,
    setAttributes: Function,
}

function parseAttributes(attributes): Attributes {
    return {
        defaultHomeserver: attributes.defaultHomeserver ?? '',
        roomId: attributes.roomId ?? '',
        height: new Height(attributes.height.value, attributes.height.unit),
        borderWidth: new BorderWidth(attributes.borderWidth.value, attributes.borderWidth.unit),
        borderRadius: new BorderRadius(attributes.borderRadius.value, attributes.borderRadius.unit),
        borderStyle: attributes.borderStyle,
        borderColor: attributes.borderColor,
    };
}

export default function Edit(props: Props): WPElement {
    const { setAttributes } = props;
    const attributes = parseAttributes(props.attributes);

    const config = window.automattic_chatrix_block_config;
    if (!config) {
        throw new Error("Failed to initialize Chatrix block: window.automattic_chatrix_block_config is not defined");
    }

    const chatProps: ChatProps = {
        focusable: true,
        hostRoot: config.rootUrl,
        ...attributes
    };

    return (
        <>
            <InspectorControls attributes={attributes} setAttributes={setAttributes}/>
            <div {...useBlockProps()}>
                <ResizableBox
                    size={{
                        width: "100%",
                        height: attributes.height.toString(),
                    }}
                    enable={{
                        top: false,
                        right: false,
                        bottom: true,
                        left: false,
                        topRight: false,
                        bottomRight: false,
                        bottomLeft: false,
                        topLeft: false,
                    }}
                    onResizeStop={(_event, _direction, elt) => {
                        setAttributes({ height: { value: elt.clientHeight, unit: "px" } });
                    }}
                >
                    <Chat {...chatProps}/>
                </ResizableBox>
            </div>
        </>
    );
}
