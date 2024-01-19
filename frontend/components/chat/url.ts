const LOGIN_TOKEN_PARAM_NAME = "loginToken";

type IframeParams = {
    instanceId: string,
    defaultHomeserver?: string
    roomId?: string,
    enableServiceWorker?: boolean,
}

export class IframeUrl {
    private readonly url: URL;

    constructor(iframeUrl: URL, params: IframeParams) {
        this.url = iframeUrl;

        for (let key in params) {
            let value = params[key];

            if (typeof value === 'boolean') {
                value = value ? "true" : "false";
            }

            if (!value) {
                continue;
            }

            this.url.searchParams.append(key, value);
        }

        this.applyLoginToken();
    }

    public toString(): string {
        return this.url.toString();
    }

    private applyLoginToken(): void {
        const paramName = LOGIN_TOKEN_PARAM_NAME;
        const queryParams = new URLSearchParams(window.location.search);

        if (queryParams.has(paramName)) {
            this.url.searchParams.append(
                paramName,
                queryParams.get(paramName) ?? ""
            );
        }
    }
}
