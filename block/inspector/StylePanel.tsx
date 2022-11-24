import { PanelBody, PanelRow, TextControl } from "@wordpress/components";
import { WPElement } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

export default function StylePanel({ attributes, setAttributes }): WPElement {
    return (
        <PanelBody
            title={__("Style", "chatrix")}
            initialOpen={false}
        >
            <PanelRow>
                <TextControl
                    label={__("height", "chatrix")}
                    value={attributes.height.value}
                    onChange={(value) => {
                        setAttributes({ height: { value: value, unit: "px" } });
                    }}
                    help={__("In pixels", "chatrix")}
                />
            </PanelRow>
        </PanelBody>
    );
}
