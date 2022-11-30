import { useBlockProps } from "@wordpress/block-editor";
import { ResizableBox } from "@wordpress/components";
import { WPElement } from '@wordpress/element';
import { Height } from "./attributes";
import './editor.scss';
import IFrame, { IframeProps } from "./iframe";
import InspectorControls from "./inspector/InspectorControls";

export default function Edit({ attributes, setAttributes }): WPElement {
    const height = new Height(attributes.height.value, attributes.height.unit);

    const iframeProps: IframeProps = {
        height: height.toString(),
        focusable: true,
        defaultHomeserver: attributes.defaultHomeserver,
        roomId: attributes.roomId,
    };

    return (
        <>
            <InspectorControls attributes={attributes} setAttributes={setAttributes}/>
            <div {...useBlockProps()}>
                <ResizableBox
                    size={{
                        width: "100%",
                        height: height.toString(),
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
                    <IFrame {...iframeProps}/>
                </ResizableBox>
            </div>
        </>
    );
}
