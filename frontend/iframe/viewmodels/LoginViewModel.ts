import { LoginViewModel as BaseLoginViewModel } from "hydrogen-web/src/domain/login/LoginViewModel";
import { Options as BaseOptions } from "hydrogen-web/src/domain/ViewModel";
import { Client } from "hydrogen-web/src/matrix/Client";

type ReadyFn = (client: Client) => void;

type Options = {
    defaultHomeserver: string;
    ready: ReadyFn;
} & BaseOptions;

export class LoginViewModel extends BaseLoginViewModel {
    constructor(options: Options) {
        super(options);
    }
}
