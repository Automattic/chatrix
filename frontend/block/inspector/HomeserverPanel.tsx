import { PanelBody, PanelRow, TextControl } from "@wordpress/components";
import { WPElement } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

export default function HomeserverPanel({ attributes, setAttributes }): WPElement {
    return (
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
    );
}
