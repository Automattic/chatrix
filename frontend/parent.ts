export function parent(scriptId: string) {
    const scriptElement = document.querySelector(`#${scriptId}`);
    if (!scriptElement) {
        throw new Error(`Script with id #${scriptId} not found.`)
    }

    const parentHostRoot = (scriptElement as HTMLScriptElement).src;
    const hostRoot = new URL(parentHostRoot).origin;
    const className = `${scriptId}-iframe`;
    loadIframe(hostRoot, className);
}

function loadIframe(hostRoot: string, className: string) {
    const iframe = document.createElement("iframe");
    iframe.src = new URL("app.html", hostRoot).href;
    iframe.className = className;
    document.body.appendChild(iframe);
}
