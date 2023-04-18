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

let instanceIds: string[] = [];

export default function Edit(props: Props): WPElement {
    const { attributes, setAttributes } = props;

    // Set instanceId if it's not set, or if it already exists on the page (which happens when the block is duplicated).
    useEffect(() => {
        // @ts-ignore
        let { instanceId } = attributes;
        const hasInstanceId = instanceId && instanceId !== "";
        const isInstanceIdDuplicated = hasInstanceId && instanceIds.includes(instanceId);

        if (!hasInstanceId || isInstanceIdDuplicated) {
            instanceId = (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString();
            setAttributes({ instanceId });
        }

        instanceIds.push(instanceId);
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
