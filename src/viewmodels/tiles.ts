import { TextTile, ImageTile, VideoTile, FileTile, LocationTile, RedactedTile, EncryptionEnabledTile, tileClassForEntry } from "hydrogen-view-sdk";

// Override all the message-tiles to show the display name as "me"
class ChatterboxTextTile extends TextTile {
    get displayName() {
        return this.isOwn? "me" : super.displayName;
    }

    get avatarLetter() { 
        return "";
    }

    avatarUrl() {
        return this.isOwn? this._options.config["avatar"]: null;
    }
}

class ChatterboxImageTile extends ImageTile {
    get displayName() {
        return this.isOwn? "me" : super.displayName;
    }
    
    get avatarLetter() { 
        return "";
    }

    avatarUrl() {
        return this.isOwn? this._options.config["avatar"]: null;
    }
}

class ChatterboxVideoTile extends VideoTile {
    get displayName() {
        return this.isOwn? "me" : super.displayName;
    }
    
    get avatarLetter() { 
        return "";
    }

    avatarUrl() {
        return this.isOwn? this._options.config["avatar"]: null;
    }
}

class ChatterboxFileTile extends FileTile {
    get displayName() {
        return this.isOwn? "me" : super.displayName;
    }
    
    get avatarLetter() { 
        return "";
    }

    avatarUrl() {
        return this.isOwn? this._options.config["avatar"]: null;
    }
}

class ChatterboxLocationTile extends LocationTile {
    get displayName() {
        return this.isOwn? "me" : super.displayName;
    }
    
    get avatarLetter() { 
        return "";
    }

    avatarUrl() {
        return this.isOwn? this._options.config["avatar"]: null;
    }
}

class ChatterboxRedactedTile extends RedactedTile {
    get displayName() {
        return this.isOwn? "me" : super.displayName;
    }
    
    get avatarLetter() { 
        return "";
    }

    avatarUrl() {
        return this._options.config["avatar"];
    }
}

// We don't want to show the (long and random) user-id in this announcement! 
class ChatterboxEncryptionEnabledTile extends EncryptionEnabledTile {
    get announcement() {
        return this.i18n`This room is end-to-end encrypted 🔒`;
    }
}

export function createCustomTileClassForEntry(ownUserId: string) {
    return function customTileClassForEntry(entry) {
        switch (entry.eventType) {
            case "m.room.message":
                if (entry.isRedacted) {
                    return ChatterboxRedactedTile;
                }
                const content = entry.content;
                const msgtype = content && content.msgtype;
                switch (msgtype) {
                    case "m.text":
                    case "m.notice":
                    case "m.emote":
                        return ChatterboxTextTile;
                    case "m.image":
                        return ChatterboxImageTile;
                    case "m.video":
                        return ChatterboxVideoTile;
                    case "m.file":
                        return ChatterboxFileTile;
                    case "m.location":
                        return ChatterboxLocationTile;
                    default:
                        // unknown msgtype not rendered
                        return undefined;
                }
            case "m.room.member":
                if (entry.content?.membership === "join" && entry.sender !== ownUserId) {
                    return tileClassForEntry(entry);
                }
                else {
                    return undefined;
                }
            case "m.room.encryption":
                return ChatterboxEncryptionEnabledTile;
            default:
                return tileClassForEntry(entry);

        }
    }
}
