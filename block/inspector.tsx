import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, PanelRow, TextControl } from "@wordpress/components";
import { WPElement } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

export default function Inspector({ attributes, setAttributes }): WPElement {
    return (
        <InspectorControls>
            <PanelBody
                title={__("Homeserver and room", "chatrix")}
                initialOpen={true}
            >
                <PanelRow>
                    <TextControl
                        label={__("Default Homeserver", "chatrix")}
                        value={attributes.defaultHomeserver}
                        onChange={(value) => setAttributes({ defaultHomeserver: value })}
                    />
                </PanelRow>
                <PanelRow>
                    <TextControl
                        label={__("Room id (optional)", "chatrix")}
                        value={attributes.roomId}
                        onChange={(value) => setAttributes({ roomId: value })}
                        help={<RoomIdHelp/>}
                    />
                </PanelRow>
            </PanelBody>
        </InspectorControls>
    );
}

function RoomIdHelp() {
    return (
        <>
            <p>{__("When a room id is specified, the client will be in single-room mode.", "chatrix")}</p>
            <p>{__("In this mode, the client opens directly in that room, with the user not having access to the screen that shows the list of rooms.", "chatrix")}</p>
            <p>{__("The room must be public, so that the user can join without requiring an invitation.", "chatrix")}</p>
            <p>{__("The room id must be the room's actual id, it must not be an alias.", "chatrix")}</p>
            <p>{__("Example: !abc123:example.com", "chatrix")}</p>
        </>
    );
}
