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

export interface IChatrixConfig {
    // Allows for having multiple clients with different configuration on the same domain.
    // Set to null if you don't require this feature.
    instance_id: string | null,
    homeserver: string;
    login_methods: Array<string> | null,
    welcome_message_heading: string,
    welcome_message_text: string,
    // Id of the room to use, e.g. !room-id:example.com.
    room_id: string;
    // Configurations for header on chatrix (containing title, avatar, minimize button)
    header: IHeader;
}

interface IHeader {
    // An optional static title.
    title?: string;
    // An optional link to static avatar. If this is not given, the room avatar is used instead
    avatar?: string;
}
