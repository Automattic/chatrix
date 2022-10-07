import { WPElement } from '@wordpress/element';
import { useBlockProps } from "@wordpress/block-editor";
import ServerSideRender from "@wordpress/server-side-render";
import './editor.scss';

// @ts-ignore
export default function Edit({ attributes }): WPElement {
    const blockProps = useBlockProps();
    return (
        <div {...blockProps}>
            <ServerSideRender
                block="automattic/chatrix"
                attributes={ attributes }
            />
        </div>
    );
}
