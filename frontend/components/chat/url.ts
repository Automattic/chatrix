const LOGIN_TOKEN_PARAM_NAME = "loginToken";

export type IframeParams = {
    defaultHomeserver?: string
    roomId?: string,
}

export class IframeUrl {
    private readonly url: URL;

    constructor(hostRoot: string, params: IframeParams) {
        this.url = new URL("index.html?", hostRoot);

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

    public hasLoginToken(): boolean {
        return this.url.searchParams.has(LOGIN_TOKEN_PARAM_NAME);
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
