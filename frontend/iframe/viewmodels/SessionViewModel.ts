import { SessionViewModel as BaseSessionViewModel } from "hydrogen-web/src/domain/session/SessionViewModel";

export class SessionViewModel extends BaseSessionViewModel {
    constructor(options) {
        super(options);
    }

    get id() {
        return super.id;
    }

    start() {
        super.start();
    }

    dispose(): void {
        super.dispose();
    }
}
