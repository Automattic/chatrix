import { useBlockProps } from "@wordpress/block-editor";
import { ResizableBox } from "@wordpress/components";
import { WPElement } from '@wordpress/element';
import './editor.scss';
import IFrame from "./iframe";
import InspectorControls from "./inspector";

export default function Edit({ attributes, setAttributes }): WPElement {
    const {
        height,
        heightUnit,
    } = attributes;

    const heightWithUnit =
        height && heightUnit
            ? `${height}${heightUnit}`
            : height;

    return (
        <>
            <InspectorControls attributes={attributes} setAttributes={setAttributes}/>
            <div {...useBlockProps()}>
                <ResizableBox
                    size={{
                        width: "100%",
                        height: attributes.height,
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
                        setAttributes({ height: elt.clientHeight, heightUnit: "px" });
                    }}
                >
                    <IFrame props={{ height: heightWithUnit }} attributes={attributes} focusable={true}/>
                </ResizableBox>
            </div>
        </>
    );
}
