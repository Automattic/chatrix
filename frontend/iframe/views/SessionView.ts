import { SessionViewModel } from "hydrogen-web/src/domain/session/SessionViewModel";
import { StaticView } from "hydrogen-web/src/platform/web/ui/general/StaticView";
import { CreateRoomView } from "hydrogen-web/src/platform/web/ui/session/CreateRoomView";
import { JoinRoomView } from "hydrogen-web/src/platform/web/ui/session/JoinRoomView";
import { LeftPanelView } from "hydrogen-web/src/platform/web/ui/session/leftpanel/LeftPanelView";
import { RightPanelView } from "hydrogen-web/src/platform/web/ui/session/rightpanel/RightPanelView";
import { viewClassForTile } from "hydrogen-web/src/platform/web/ui/session/room/common";
import { InviteView } from "hydrogen-web/src/platform/web/ui/session/room/InviteView";
import { LightboxView } from "hydrogen-web/src/platform/web/ui/session/room/LightboxView";
import { RoomBeingCreatedView } from "hydrogen-web/src/platform/web/ui/session/room/RoomBeingCreatedView";
import { UnknownRoomView } from "hydrogen-web/src/platform/web/ui/session/room/UnknownRoomView";
import { RoomGridView } from "hydrogen-web/src/platform/web/ui/session/RoomGridView";
import { SessionStatusView } from "hydrogen-web/src/platform/web/ui/session/SessionStatusView";
import { SessionView as BaseSessionView } from "hydrogen-web/src/platform/web/ui/session/SessionView";
import { SettingsView } from "hydrogen-web/src/platform/web/ui/session/settings/SettingsView";
import { RoomView } from "./RoomView";

export class SessionView extends BaseSessionView {
    constructor(value: SessionViewModel) {
        super(value);
    }

    render(t, vm) {
        return t.div({
            className: {
                "SessionView": true,
                "middle-shown": vm => !!vm.activeMiddleViewModel,
                "right-shown": vm => !!vm.rightPanelViewModel
            },
        }, [
            t.view(new SessionStatusView(vm.sessionStatusViewModel)),
            t.view(new LeftPanelView(vm.leftPanelViewModel)),
            t.mapView(vm => vm.activeMiddleViewModel, () => {
                if (vm.roomGridViewModel) {
                    return new RoomGridView(vm.roomGridViewModel, viewClassForTile);
                } else if (vm.settingsViewModel) {
                    return new SettingsView(vm.settingsViewModel);
                } else if (vm.createRoomViewModel) {
                    return new CreateRoomView(vm.createRoomViewModel);
                } else if (vm.joinRoomViewModel) {
                    return new JoinRoomView(vm.joinRoomViewModel);
                } else if (vm.currentRoomViewModel) {
                    if (vm.currentRoomViewModel.kind === "invite") {
                        return new InviteView(vm.currentRoomViewModel);
                    } else if (vm.currentRoomViewModel.kind === "room") {
                        return new RoomView(vm.currentRoomViewModel, viewClassForTile);
                    } else if (vm.currentRoomViewModel.kind === "roomBeingCreated") {
                        return new RoomBeingCreatedView(vm.currentRoomViewModel);
                    } else {
                        return new UnknownRoomView(vm.currentRoomViewModel);
                    }
                } else {
                    return new StaticView(t => t.div({className: "room-placeholder"}, t.h2(vm.i18n`Choose a room on the left side.`)));
                }
            }),
            t.mapView(vm => vm.lightboxViewModel, lightboxViewModel => lightboxViewModel ? new LightboxView(lightboxViewModel) : null),
            t.mapView(vm => vm.rightPanelViewModel, rightPanelViewModel => rightPanelViewModel ? new RightPanelView(rightPanelViewModel) : null)
        ]);
    }
}
