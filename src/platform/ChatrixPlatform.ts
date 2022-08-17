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

import { Platform } from "hydrogen-view-sdk";
import { SessionInfoStorage } from "./SessionInfoStorage";

export class ChatrixPlatform extends Platform {
    constructor(options, instanceId: string | null, backendUserId: string | null) {
        super(options);
        let sessionName = "hydrogen_sessions_v1"
        if (instanceId && instanceId !== "") {
            sessionName = `${sessionName}_${instanceId}`;
        }
        if (backendUserId && backendUserId !== "") {
            sessionName = `${sessionName}_${backendUserId}`;
        }

        this.sessionInfoStorage = new SessionInfoStorage(sessionName);

        this.cleanupSessions(sessionName);
    }

    cleanupSessions(activeSessionName: string) {
        for (let i=0; i<localStorage.length; i++) {
            let key = localStorage.key(i);
            if (!key.startsWith("hydrogen_sessions_v1") || key === activeSessionName) {
                continue;
            }
            this.invalidateSession(
                JSON.parse(localStorage.getItem(key))[0]
            );
            localStorage.removeItem(key);
        }
    }

    invalidateSession(session: {[key: string]: string}) {
        fetch(session.homeserver + '/_matrix/client/v3/logout', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + session.accessToken,
            },
        });
    }
}
