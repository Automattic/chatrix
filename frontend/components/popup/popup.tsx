import { useState } from "@wordpress/element";
import { Chat, ChatProps } from "../chat";

export interface PopupProps extends ChatProps {
}

export function Popup(props: PopupProps) {
    const [active, setActive] = useState(false);
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
