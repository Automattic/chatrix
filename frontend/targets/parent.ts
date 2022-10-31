type IframeConfig = {
    defaultHomeserver: string
    roomId: string,
    loginToken?: string;
}

export function parent() {
    const env = import.meta.env;

    let config = {
        defaultHomeserver: env.VITE_HOMESERVER,
        roomId: env.VITE_ROOM_ID,
    };

    loadIframe(window.origin, config);
}

function loadIframe(hostRoot: string, config: IframeConfig) {
    const iframeUrl = appendQueryParams(new URL("index.html?", hostRoot), config);

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

function appendQueryParams(url: URL, config: IframeConfig): string {
    const queryParams = new URLSearchParams(window.location.search);

    if (queryParams.has("loginToken")) {
        // @ts-ignore
        config.loginToken = queryParams.get("loginToken");
    }

    for (let key in config) {
        if (!!config[key]) {
            url.searchParams.append(key, config[key]);
        }
    }

    return url.toString();
}
