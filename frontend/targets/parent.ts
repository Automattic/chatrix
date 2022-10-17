// This code is not used in the production build.
// It's only used in local development environments.

import { IConfig } from "../config/IConfig";

export function parent(scriptId: string) {
    const env = import.meta.env;
    const loginToken = new URLSearchParams(window.location.search).get("loginToken");

    let config = {
        defaultHomeserver: env.VITE_HOMESERVER,
    };

    const scriptElement = document.querySelector(`#${scriptId}`);
    if (!scriptElement) {
        throw new Error(`Script with id #${scriptId} not found.`);
    }

    const parentHostRoot = (scriptElement as HTMLScriptElement).src;
    const hostRoot = new URL(parentHostRoot).origin;
    loadIframe(hostRoot, scriptId, config, loginToken);
}

function loadIframe(hostRoot: string, scriptId: string, config: { defaultHomeserver: string }, loginToken: string | null) {
    let url = "index.html?";

    let property: keyof IConfig;
    for (property in config) {
        let value: string = config[property] ?? "";
        if (value) {
            url += `${property}=${encodeURIComponent(value)}&`;
        }
    }

    if (loginToken) {
        url += `loginToken=${encodeURIComponent(loginToken)}`;
    }

    const iframe = document.createElement("iframe");
    iframe.src = new URL(url, hostRoot).href;
    iframe.className = `${scriptId}-iframe`;

    const container = document.createElement("div");
    container.id = `${scriptId}-container`;
    container.appendChild(iframe);

    const parent = document.createElement("div");
    parent.id = `${scriptId}-parent`;
    parent.appendChild(container);

    document.body.appendChild(parent);
}
