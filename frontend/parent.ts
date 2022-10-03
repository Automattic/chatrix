export function parent(scriptId: string) {
    const scriptElement = document.querySelector(`#${scriptId}`);
    if (!scriptElement) {
        throw new Error(`Script with id #${scriptId} not found.`)
    }

    const parentHostRoot = (scriptElement as HTMLScriptElement).src;
    const hostRoot = new URL(parentHostRoot).origin;
    loadIframe(hostRoot, scriptId);
}

function loadIframe(hostRoot: string, scriptId: string) {
    const iframe = document.createElement("iframe");
    iframe.src = new URL("app.html", hostRoot).href;
    iframe.className = `${scriptId}-iframe`;

    const parent = document.createElement("div");
    parent.id = `${scriptId}-parent`;
    parent.appendChild(iframe)

    document.body.appendChild(parent);
}
