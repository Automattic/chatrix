import { useState } from '@wordpress/element';
import { Chat, ChatProps } from "../chat";

export interface Props extends ChatProps {
}

export function Popup(props: Props) {
    const [active, setActive] = useState(false);
    const chat = active ? <Chat {...props}/> : undefined;

    return (
        <div className={"chatrix-component-popup"}>
            {chat}
            <div className={"chatrix-component-popup-start-button"}>
                <button
                    className={`${active ? "active" : ""}`}
                    onClick={() => setActive(prevActive => !prevActive)}
                ></button>
            </div>
        </div>
    );
}
