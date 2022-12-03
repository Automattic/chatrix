import { useBlockProps } from "@wordpress/block-editor";
import { ResizableBox } from "@wordpress/components";
import { WPElement } from '@wordpress/element';
import { Block, BlockProps, parseAttributes } from "../frontend/components/block";
import './editor.scss';
import InspectorControls from "./inspector/InspectorControls";

interface Props {
    attributes: object,
    setAttributes: Function,
}

export default function Edit(props: Props): WPElement {
    const { attributes, setAttributes } = props;
    const parsedAttributes = parseAttributes(attributes);

    const blockProps: BlockProps = {
        focusable: true,
        attributes
    };

    return (
        <>
            <InspectorControls attributes={attributes} setAttributes={setAttributes}/>
            <div {...useBlockProps()}>
                <ResizableBox
                    size={{
                        width: "100%",
                        height: parsedAttributes.height ? parsedAttributes.height.toString() : "600px",
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
                    <Block {...blockProps}/>
                </ResizableBox>
            </div>
        </>
    );
}
