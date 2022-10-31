type IframeParams = {
    defaultHomeserver: string
    roomId: string,
    loginToken?: string;
}

export function loadIframe(hostRoot: string, params: IframeParams) {
    const iframeUrl = appendQueryParams(new URL("index.html?", hostRoot), params);

    const iframe = document.createElement("iframe");
    iframe.src = iframeUrl;
    iframe.className = "chatrix-iframe";

    const container = document.createElement("div");
    container.id = "chatrix-container";
    container.appendChild(iframe);

    const parent = document.createElement("div");
    parent.id = "chatrix-parent";
    parent.appendChild(container);

    document.body.appendChild(parent);
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
