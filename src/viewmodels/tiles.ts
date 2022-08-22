/*
Copyright 2022 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import {
    EncryptionEnabledTile,
    FileTile,
    ImageTile,
    LocationTile,
    RedactedTile,
    TextTile,
    tileClassForEntry,
    VideoTile
} from "hydrogen-view-sdk";

// Override all the message-tiles to show the display name as "me"
class ChatrixTextTile extends TextTile {
    get displayName() {
        return this.isOwn ? "me" : super.displayName;
    }

    get avatarLetter() {
        return "";
    }

    avatarUrl(size) {
        if (!this.isOwn) {
            return super.avatarUrl(size);
        }
        return this._options.config["avatar"] ?? null;
    }
}

class ChatrixImageTile extends ImageTile {
    get displayName() {
        return this.isOwn ? "me" : super.displayName;
    }

    get avatarLetter() {
        return "";
    }

    avatarUrl(size) {
        if (!this.isOwn) {
            return super.avatarUrl(size);
        }
        return this._options.config["avatar"] ?? null;
    }
}

class ChatrixVideoTile extends VideoTile {
    get displayName() {
        return this.isOwn ? "me" : super.displayName;
    }

    get avatarLetter() {
        return "";
    }

    avatarUrl(size) {
        if (!this.isOwn) {
            return super.avatarUrl(size);
        }
        return this._options.config["avatar"] ?? null;
    }
}

class ChatrixFileTile extends FileTile {
    get displayName() {
        return this.isOwn ? "me" : super.displayName;
    }

    get avatarLetter() {
        return "";
    }

    avatarUrl(size) {
        if (!this.isOwn) {
            return super.avatarUrl(size);
        }
        return this._options.config["avatar"] ?? null;
    }
}

class ChatrixLocationTile extends LocationTile {
    get displayName() {
        return this.isOwn ? "me" : super.displayName;
    }

    get avatarLetter() {
        return "";
    }

    avatarUrl(size) {
        if (!this.isOwn) {
            return super.avatarUrl(size);
        }
        return this._options.config["avatar"] ?? null;
    }
}

class ChatrixRedactedTile extends RedactedTile {
    get displayName() {
        return this.isOwn ? "me" : super.displayName;
    }

    get avatarLetter() {
        return "";
    }

    avatarUrl(size) {
        if (!this.isOwn) {
            return super.avatarUrl(size);
        }
        return this._options.config["avatar"] ?? null;
    }
}

// We don't want to show the (long and random) user-id in this announcement! 
class ChatrixEncryptionEnabledTile extends EncryptionEnabledTile {
    get announcement() {
        return this.i18n`This room is end-to-end encrypted 🔒`;
    }
}

export function createCustomTileClassForEntry(ownUserId: string) {
    return function customTileClassForEntry(entry) {
        switch (entry.eventType) {
            case "m.room.message":
                if (entry.isRedacted) {
                    return ChatrixRedactedTile;
                }
                const content = entry.content;
                const msgtype = content && content.msgtype;
                switch (msgtype) {
                    case "m.text":
                    case "m.notice":
                    case "m.emote":
                        return ChatrixTextTile;
                    case "m.image":
                        return ChatrixImageTile;
                    case "m.video":
                        return ChatrixVideoTile;
                    case "m.file":
                        return ChatrixFileTile;
                    case "m.location":
                        return ChatrixLocationTile;
                    default:
                        // unknown msgtype not rendered
                        return undefined;
                }
            case "m.room.member":
                if ((entry.content?.membership === "join" || entry.content?.membership === "leave")
                    && entry.sender !== ownUserId) {
                    return tileClassForEntry(entry);
                }
                else {
                    return undefined;
                }
            case "m.room.encryption":
                return ChatrixEncryptionEnabledTile;
            default:
                return tileClassForEntry(entry);

        }
    }
}
