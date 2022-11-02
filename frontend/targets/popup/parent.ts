import { IframeParams } from "../../parent/iframe";
import "./parent.css";
import { Popup } from "./src/popup";

export function loadPopup(containerId: string, hostRoot: string, params: IframeParams): void {
    window.AutomatticChatrixPopup = new Popup(containerId, hostRoot, params);
}

declare global {
    interface Window {
        AutomatticChatrixPopup: Popup;
    }
}
