import { useState } from "@wordpress/element";
import { Chat, ChatProps } from "../chat";

export interface PopupProps extends ChatProps {
}

export function Popup(props: PopupProps) {
    // We set it to active if a loginToken is present in the query params.
    // This will result in the client opening without the user clicking the start button, so that
    // the SSO flow can be completed.
    const [active, setActive] = useState(hasLoginToken());
    const chat = active ? <Chat {...props}/> : undefined;

    return (
        <div className={"chatrix-component-popup"}>
            <div className={`chatrix-component-popup-chat-container ${active ? "active" : ""}`}>
                {chat}
            </div>
            <div className={"chatrix-component-popup-start-button"}>
                <button
                    className={`${active ? "active" : ""}`}
                    onClick={() => setActive(prevActive => !prevActive)}
                ></button>
            </div>
        </div>
    );
}

function hasLoginToken() {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.has("loginToken");
}
