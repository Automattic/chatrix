/*
Copyright 2022 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { isMobile } from "./common";
import { toggleIframe } from "./iframe";

const parentHostRoot = ( document.querySelector("#chatterbox-script") as HTMLScriptElement).src;
const hostRoot = new URL(parentHostRoot).origin;

export function loadStartButton() {
    loadCSS();
    const container = document.createElement("div");
    container.className = "start";
    const button = createStartButton();
    container.appendChild(button);
    document.body.appendChild(container);
    if ( new URLSearchParams(window.location.search).get("loginToken") ) {
        loadIframe(false);
    } else if (window.localStorage.getItem("chatterbox-should-load-in-background")) {
        /**
         * If chatrix made it to the timeline before, load the chatrix app in background.
         * This will let us watch for new messages and show a notification badge as needed.
         */
        loadIframe(true);
        toggleIframe();
    }
}

function createStartButton() {
    const button = document.createElement("button");
    button.className = "start-chat-btn";
    button.onclick = () => (window as any).isIframeLoaded? toggleIframe() : loadIframe();
    button.appendChild(createNotificationBadge());
    return button;
}

function createNotificationBadge() {
    const notificationBadge = document.createElement("span");
    notificationBadge.className = "notification-badge hidden";
    return notificationBadge;
}

function loadCSS() {
    const linkElement = document.createElement("link") as HTMLLinkElement;
    linkElement.rel = "stylesheet";
    linkElement.href = new URL("CSS_FILE_NAME", parentHostRoot).href;
    document.head.appendChild(linkElement);
}

function loadIframe(minimized = false) {
    const iframe = document.createElement("iframe");

    let htmlLocation = (window as any).CHATRIX_HTML_LOCATION;
    if (!htmlLocation) {
        htmlLocation = "../chatrix.html";
    }

    const configLocation = (window as any).CHATRIX_CONFIG_LOCATION;
    if (!configLocation) {
        throw new Error("CHATRIX_CONFIG_LOCATION is not set");
    }

    const backendUserId = (window as any).CHATTERBOX_BACKEND_USER_ID || null;

    const urlParams = new URLSearchParams(window.location.search);
    const loginToken = urlParams.get("loginToken");
    urlParams.delete("loginToken");
    window.history.replaceState( null, '', (urlParams.entries.length ? '?' + urlParams : './' ) + location.hash );

    iframe.src = new URL(
        `${htmlLocation}?config=${configLocation}${minimized? "&minimized=true": ""}${loginToken? "&loginToken="+encodeURIComponent(loginToken): ""}${backendUserId? "&backendUserId="+encodeURIComponent(backendUserId): ""}`,
        hostRoot
    ).href;
    iframe.className = "chatrix-iframe";
    document.body.appendChild(iframe);
    (window as any).isIframeLoaded = true;
    document .querySelector(".start-chat-btn") .classList.add("start-background-minimized");
    if (isMobile()) {
        (document.querySelector(".start") as HTMLDivElement).style.display =
            "none";
    }
}
