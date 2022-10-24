import { useBlockProps } from "@wordpress/block-editor";
import { WPElement } from '@wordpress/element';
import './editor.scss';
import IFrame from "./iframe";
import Inspector from "./inspector";

export default function Edit({ attributes, setAttributes }): WPElement {
    return (
        <div {...useBlockProps()}>
            <Inspector attributes={attributes} setAttributes={setAttributes}/>
            <IFrame attributes={attributes} focusable={true}/>
        </div>
    );
}
