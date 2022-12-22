import { RoomView as BaseRoomView } from "hydrogen-web/src/platform/web/ui/session/room/RoomView";
import { RoomViewModel } from "../viewmodels/RoomViewModel";

export class RoomView extends BaseRoomView {
    constructor(value: RoomViewModel, viewClassForTile) {
        super(value, viewClassForTile);
    }
}
