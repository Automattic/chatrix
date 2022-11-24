import { InspectorControls as BaseInspectorControls } from "@wordpress/block-editor";
import { PanelBody, PanelRow, TextControl } from "@wordpress/components";
import { WPElement } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import HomeserverPanel from "./HomeserverPanel";
import RoomPanel from "./RoomPanel";

export default function InspectorControls({ attributes, setAttributes }): WPElement {
    return (
        <BaseInspectorControls>
            <HomeserverPanel attributes={attributes} setAttributes={setAttributes}/>
            <RoomPanel attributes={attributes} setAttributes={setAttributes}/>

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
