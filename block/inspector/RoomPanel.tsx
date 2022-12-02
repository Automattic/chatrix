import { PanelBody, PanelRow, TextControl } from "@wordpress/components";
import { WPElement } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

export default function RoomPanel({ attributes, setAttributes }): WPElement {
    return (
        <PanelBody
            title={__("Room", "chatrix")}
            initialOpen={false}
        >
            <PanelRow>
                <TextControl
                    label={__("Room id (optional)", "chatrix")}
                    value={attributes.roomId}
                    onChange={(value) => setAttributes({ roomId: value })}
                    help={<RoomIdHelp/>}
                />
            </PanelRow>
        </PanelBody>
    );
}

function RoomIdHelp() {
    return (
        <>
            <span>{__("When a room id is specified, the client will be in single-room mode.", "chatrix")}</span><br/><br/>
            <span>{__("In this mode, the client opens directly in that room, with the user not having access to the screen that shows the list of rooms.", "chatrix")}</span><br/><br/>
            <span>{__("The room must be public, so that the user can join without requiring an invitation.", "chatrix")}</span><br/><br/>
            <span>{__("The room id must be the room's actual id, it must not be an alias.", "chatrix")}</span><br/><br/>
            <span>{__("Example: !abc123:example.com", "chatrix")}</span><br/>
        </>
    );
}
