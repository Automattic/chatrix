import { ForcedLogoutView } from "hydrogen-web/src/platform/web/ui/ForcedLogoutView";
import { StaticView } from "hydrogen-web/src/platform/web/ui/general/StaticView";
import { TemplateView } from "hydrogen-web/src/platform/web/ui/general/TemplateView";
import { LoginView } from "hydrogen-web/src/platform/web/ui/login/LoginView";
import { SessionLoadView } from "hydrogen-web/src/platform/web/ui/login/SessionLoadView";
import { SessionPickerView } from "hydrogen-web/src/platform/web/ui/login/SessionPickerView";
import { UnknownRoomView } from "hydrogen-web/src/platform/web/ui/session/room/UnknownRoomView";
import { LogoutView } from "hydrogen-web/src/platform/web/ui/LogoutView";
import { SessionView } from "hydrogen-web/src/platform/web/ui/session/SessionView";
import { Section } from "../platform/Navigation";
import { RootViewModel } from "../viewmodels/RootViewModel";

export class RootView extends TemplateView<RootViewModel> {
    constructor(value: RootViewModel) {
        super(value);
    }

    render(t, vm: RootViewModel) {
        return t.div({
            className: {
                "RootView": true,
                "single-room-mode": vm.singleRoomMode,
            },
        }, t.mapView(vm => vm.activeSection, (section: Section) => {
            console.log('render root view', section);
                switch (section) {
                    case Section.Login:
                        return new LoginView(vm.loginViewModel);
                    case Section.Logout:
                        return new LogoutView(vm.logoutViewModel);
                    case Section.ForcedLogout:
                        return new ForcedLogoutView(vm.forcedLogoutViewModel);
                    case Section.Session:
                        return new SessionView(vm.sessionViewModel);
                    case Section.SessionPicker:
                        return new SessionPickerView(vm.sessionPickerViewModel);
                    case Section.Redirecting:
                        return new StaticView(t => t.p("Redirecting..."));
                    case Section.SessionLoading:
                        return new SessionLoadView(vm.sessionLoadViewModel);
                    case Section.UnknownRoom:
                        return new UnknownRoomView(vm.unknownRoomViewModel);
                    case Section.Error:
                        return new StaticView(t => {
                            return t.div({ className: "StatusView" }, [
                                t.h1("Something went wrong"),
                                t.p(vm.error?.message),
                            ]);
                        });
                    default:
                        throw new Error(`Unknown section: ${vm.activeSection}`);
                }
            }
        ));
    }
}
