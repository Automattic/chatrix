import { SessionViewModel } from "hydrogen-web/src/domain/session/SessionViewModel";
import { SessionView as BaseSessionView } from "hydrogen-web/src/platform/web/ui/session/SessionView";

export class SessionView extends BaseSessionView {
    constructor(value: SessionViewModel) {
        super(value);
    }
}
