import { IConfig } from "./config";

export function parent(scriptId: string, config: IConfig) {
    const scriptElement = document.querySelector(`#${scriptId}`);
    if (!scriptElement) {
        throw new Error(`Script with id #${scriptId} not found.`)
    }

    const parentHostRoot = (scriptElement as HTMLScriptElement).src;
    const hostRoot = new URL(parentHostRoot).origin;
    loadIframe(hostRoot, scriptId, config);
}

function loadIframe(hostRoot: string, scriptId: string, config: IConfig) {
    let url = "app.html?";

    let property: keyof IConfig;
    for (property in config) {
        let value: string = config[property] ?? "";
        url += `${property}=${encodeURIComponent(value)}&`;
    }

    const iframe = document.createElement("iframe");
    iframe.src = new URL(url, hostRoot).href;
    iframe.className = `${scriptId}-iframe`;

    const parent = document.createElement("div");
    parent.id = `${scriptId}-parent`;
    parent.appendChild(iframe)

    document.body.appendChild(parent);
}
