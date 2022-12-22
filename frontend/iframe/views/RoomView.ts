import { Menu, MenuOption } from "hydrogen-web/src/platform/web/ui/general/Menu";
import { Popup } from "hydrogen-web/src/platform/web/ui/general/Popup";
import { RoomView as BaseRoomView } from "hydrogen-web/src/platform/web/ui/session/room/RoomView";
import { RoomViewModel } from "../viewmodels/RoomViewModel";

export class RoomView extends BaseRoomView {
    constructor(value: RoomViewModel, viewClassForTile) {
        super(value, viewClassForTile);
    }

    _toggleOptionsMenu(evt) {
        if (super._optionsPopup && super._optionsPopup.isOpen) {
            super._optionsPopup.close();
        } else {
            const vm: RoomViewModel = super.value;
            const options: MenuOption[] = [];
            options.push(Menu.option(vm.i18n`Room details`, () => vm.openDetailsPanel()));
            if (vm.canLeave) {
                options.push(Menu.option(vm.i18n`Leave room`, () => super._confirmToLeaveRoom()).setDestructive());
            }
            if (vm.canForget) {
                options.push(Menu.option(vm.i18n`Forget room`, () => vm.forgetRoom()).setDestructive());
            }
            if (vm.canRejoin) {
                options.push(Menu.option(vm.i18n`Rejoin room`, () => vm.rejoinRoom()));
            }
            if (vm.singleRoomMode) {
                options.push(Menu.option(vm.i18n`Settings`, () => vm.navigation.push("settings")));
            }
            if (!options.length) {
                return;
            }
            const optionsPopup = new Popup(new Menu(options));
            optionsPopup.trackInTemplateView(this);
            optionsPopup.showRelativeTo(evt.target, 10);

            super._optionsPopup = optionsPopup;
        }
    }
}
