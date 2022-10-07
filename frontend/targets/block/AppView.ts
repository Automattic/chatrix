import { AppView as BaseAppView } from "../../views/AppView";
import { AppViewModel } from "./AppViewModel";

export class AppView extends BaseAppView {
    constructor(vm: AppViewModel) {
        super(vm);
    }

    // @ts-ignore
    render(t, vm: AppViewModel) {
        return t.div({ className: "AppView" }, [
            t.div({ className: "hello" }, "Imagine this is a Matrix client"),
        ]);
    }
}
