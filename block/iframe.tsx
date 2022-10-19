import { useFocusableIframe } from "@wordpress/compose";
import { WPElement } from "@wordpress/element";

declare global {
    function automattic_chatrix_iframe_url<T>(someObject: T | null | undefined) : T;
}

export default function IFrame({ attributes, focusable = false }): WPElement {
    const ref = focusable ? useFocusableIframe() : undefined;
    const url = automattic_chatrix_iframe_url(attributes);

    return (
        <iframe className="wp-block-automattic-chatrix-iframe"
                // @ts-ignore
                ref={ref}
                src={url}
        ></iframe>
    );
}
