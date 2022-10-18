import { useBlockProps } from "@wordpress/block-editor";
import { WPElement } from '@wordpress/element';
import './editor.scss';
import IFrame from "./iframe";
import Inspector from "./inspector";

export default function Edit({ attributes, setAttributes }): WPElement {
    const blockProps = useBlockProps();
    attributes = {
        ...attributes,
        title: `${blockProps["data-title"]} iframe`
    };

    return (
        <div {...blockProps}>
            <Inspector attributes={attributes} setAttributes={setAttributes}/>
            <IFrame attributes={attributes}/>
        </div>
    );
}
