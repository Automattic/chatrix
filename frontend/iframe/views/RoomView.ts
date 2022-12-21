import { RoomViewModel } from "hydrogen-web/src/domain/session/room/RoomViewModel.js";
import { RoomView as BaseRoomView } from "hydrogen-web/src/platform/web/ui/session/room/RoomView";

export class RoomView extends BaseRoomView {
    constructor(value: RoomViewModel, viewClassForTile) {
        super(value, viewClassForTile);
    }
}
