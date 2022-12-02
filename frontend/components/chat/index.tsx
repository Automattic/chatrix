import { useFocusableIframe } from "@wordpress/compose";
import { IframeUrl } from "../../parent/iframe";
import { iframeClass } from "../../parent/util";
import { Attributes } from "./attributes";
import './style.scss';

export interface ChatProps extends Attributes {
    hostRoot: string,
    focusable?: boolean,
}

export function Chat(props: ChatProps) {
    const ref = props.focusable ? useFocusableIframe() : undefined;

    const iframeUrl = new IframeUrl(props.hostRoot, {
        defaultHomeserver: props.defaultHomeserver,
        roomId: props.roomId,
    });

    const style = {
        height: props.height ? props.height.toString() : '',
        borderWidth: props.borderWidth ? props.borderWidth.toString() : 0,
        borderRadius: props.borderRadius ? props.borderRadius.toString() : "",
        borderStyle: props.borderStyle ?? '',
        borderColor: props.borderColor ?? '',
    };

    return (
        <div className={"chatrix-component-chat"} style={style}>
            <iframe
                // @ts-ignore
                ref={ref}
                className={iframeClass()}
                src={iframeUrl.toString()}
            ></iframe>
        </div>
    );
}
