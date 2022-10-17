import { useBlockProps } from "@wordpress/block-editor";
import { WPElement } from '@wordpress/element';
import ServerSideRender from "@wordpress/server-side-render";
import './editor.scss';
import Inspector from "./inspector";

export default function Edit({ attributes, setAttributes }): WPElement {
    const blockProps = useBlockProps();
    return (
        <div {...blockProps}>
            <Inspector
                attributes={attributes}
                setAttributes={setAttributes}
            />
            <ServerSideRender
                block="automattic/chatrix"
                attributes={attributes}
            />
        </div>
    );
}
