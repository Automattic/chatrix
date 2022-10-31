type IframeParams = {
    defaultHomeserver: string
    roomId: string,
    loginToken?: string;
}

export function loadIframe(containerId: string, hostRoot: string, params: IframeParams) {
    const container = document.querySelector(`#${containerId}`);
    if (!container) {
        throw new Error(`Container for iframe was not found: ${containerId}`);
    }

    const iframeUrl = appendQueryParams(new URL("index.html?", hostRoot), params);
    const iframe = document.createElement("iframe");
    iframe.src = iframeUrl;
    iframe.className = "chatrix-iframe";

    container.className = "chatrix-container";
    container.appendChild(iframe);
}

function appendQueryParams(url: URL, params: IframeParams): string {
    const queryParams = new URLSearchParams(window.location.search);

    if (queryParams.has("loginToken")) {
        // @ts-ignore
        params.loginToken = queryParams.get("loginToken");
    }

    for (let key in params) {
        if (!!params[key]) {
            url.searchParams.append(key, params[key]);
        }
    }

    return url.toString();
}
