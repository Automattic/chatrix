import { InspectorControls as BaseInspectorControls } from "@wordpress/block-editor";
import { PanelBody, PanelRow, TextControl } from "@wordpress/components";
import { WPElement } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

export default function InspectorControls({ attributes, setAttributes }): WPElement {
    return (
        <BaseInspectorControls>
            <PanelBody
                title={__("Homeserver", "chatrix")}
                initialOpen={true}
            >
                <PanelRow>
                    <TextControl
                        label={__("Default Homeserver", "chatrix")}
                        value={attributes.defaultHomeserver}
                        onChange={(value) => setAttributes({ defaultHomeserver: value })}
                    />
                </PanelRow>
            </PanelBody>
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
            <PanelBody
                title={__("Layout", "chatrix")}
                initialOpen={false}
            >
                <PanelRow>
                    <TextControl
                        label={__("height", "chatrix")}
                        value={attributes.height.value}
                        onChange={(value) => {
                            setAttributes({ height: { value: value, unit: "px" } });
                        }}
                        help={"In pixels"}
                    />
                </PanelRow>
            </PanelBody>
        </BaseInspectorControls>
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
