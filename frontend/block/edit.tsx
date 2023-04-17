import { useBlockProps } from "@wordpress/block-editor";
import { ResizableBox } from "@wordpress/components";
import { useEffect, WPElement } from '@wordpress/element';
import { getIframeUrl } from "../app";
import { Block, BlockProps, parseAttributes } from "../components/block";
import './editor.scss';
import InspectorControls from "./inspector/InspectorControls";

interface Props {
    attributes: object,
    setAttributes: Function,
}

export default function Edit(props: Props): WPElement {
    const { attributes, setAttributes } = props;

    // Set uuid if it's not set.
    useEffect(() => {
        // @ts-ignore
        const { uuid } = attributes;
        if (!uuid || uuid === "") {
            const id = (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString();
            setAttributes({uuid: id});
        }
    }, []);

    const parsedAttributes = parseAttributes(attributes);
    const blockProps: BlockProps = {
        focusable: true,
        attributes: parsedAttributes,
        iframeUrl: getIframeUrl(),
    };

    return (
        <>
            <InspectorControls attributes={attributes} setAttributes={setAttributes}/>
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
                <div {...useBlockProps()}>
                    <Block {...blockProps}/>
                </div>
            </ResizableBox>
        </>
    );
}
