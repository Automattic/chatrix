import { useBlockProps } from "@wordpress/block-editor";
import { ResizableBox } from "@wordpress/components";
import { WPElement } from '@wordpress/element';
import { parseAttributes } from "./attributes";
import './editor.scss';
import IFrame, { IframeProps } from "./iframe";
import InspectorControls from "./inspector/InspectorControls";

interface Props {
    attributes: object,
    setAttributes: Function,
}

export default function Edit(props: Props): WPElement {
    const { setAttributes } = props;
    const attributes = parseAttributes(props.attributes);

    const iframeProps: IframeProps = {
        focusable: true,
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
                    <IFrame {...iframeProps}/>
                </ResizableBox>
            </div>
        </>
    );
}
