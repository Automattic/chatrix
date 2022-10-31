// This code is not used in the production build.
// It's only used in local development environments.

import { IConfig } from "../config/IConfig";

export function parent() {
    const env = import.meta.env;

    let config = {
        defaultHomeserver: env.VITE_HOMESERVER,
        roomId: env.VITE_ROOM_ID,
    };

    loadIframe(window.origin, config);
}

function loadIframe(hostRoot: string, config: { defaultHomeserver: string }) {
    let url = "index.html?";

    let property: keyof IConfig;
    for (property in config) {
        let value: string = config[property] ?? "";
        if (value) {
            url += `${property}=${encodeURIComponent(value)}&`;
        }
    }

    const loginToken = new URLSearchParams(window.location.search).get("loginToken");
    if (loginToken) {
        url += `loginToken=${encodeURIComponent(loginToken)}`;
    }

    const iframe = document.createElement("iframe");
    iframe.src = new URL(url, hostRoot).href;
    iframe.className = "chatrix-iframe";

    const container = document.createElement("div");
    container.id = "chatrix-container";
    container.appendChild(iframe);

    const parent = document.createElement("div");
    parent.id = "chatrix-parent";
    parent.appendChild(container);

    document.body.appendChild(parent);
}
