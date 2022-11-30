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
            <PanelRow>
                <TextControl
                    label={__("border width", "chatrix")}
                    value={attributes.borderWidth.value}
                    onChange={(value) => {
                        setAttributes({ borderWidth: { value: value, unit: "px" } });
                    }}
                    help={__("In pixels", "chatrix")}
                />
            </PanelRow>
            <PanelRow>
                <TextControl
                    label={__("border style", "chatrix")}
                    value={attributes.borderStyle}
                    onChange={(value) => {
                        setAttributes({ borderStyle: value });
                    }}
                />
            </PanelRow>
            <PanelRow>
                <TextControl
                    label={__("border color", "chatrix")}
                    value={attributes.borderColor}
                    onChange={(value) => {
                        setAttributes({ borderColor: value });
                    }}
                />
            </PanelRow>
            <PanelRow>
                <TextControl
                    label={__("border radius", "chatrix")}
                    value={attributes.borderRadius.value}
                    onChange={(value) => {
                        setAttributes({ borderRadius: { value: value, unit: "px" } });
                    }}
                    help={__("In pixels", "chatrix")}
                />
            </PanelRow>
        </PanelBody>
    );
}
