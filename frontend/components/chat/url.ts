const LOGIN_TOKEN_PARAM_NAME = "loginToken";

type IframeParams = {
    instanceId: string,
    defaultHomeserver?: string
    roomId?: string,
}

export class IframeUrl {
    private readonly url: URL;

    constructor(iframeUrl: URL, params: IframeParams) {
        this.url = iframeUrl;

        for (let key in params) {
            if (!!params[key]) {
                this.url.searchParams.append(key, params[key]);
            }
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
