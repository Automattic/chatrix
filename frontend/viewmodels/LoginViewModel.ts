import { Client, ViewModel } from "hydrogen-view-sdk";

export class LoginViewModel extends ViewModel {
    private _client: typeof Client;

    constructor(options: any) {
        super(options);
        const { client } = options;
        this._client = client;
    }
}
