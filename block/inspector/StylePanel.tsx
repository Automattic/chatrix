import { PanelBody, PanelRow, TextControl } from "@wordpress/components";
import { WPElement } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import TextControlWithUnit from "./TextControlWithUnit";

export default function StylePanel({ attributes, setAttributes }): WPElement {
    return (
        <PanelBody
            title={__("Style", "chatrix")}
            initialOpen={false}
        >
            <PanelRow>
                <TextControlWithUnit
                    label={__("height", "chatrix")}
                    value={attributes.height.value}
                    unit={attributes.height.unit}
                    onChange={(value) => {
                        setAttributes({ height: { value: value, unit: "px" } });
                    }}
                />
            </PanelRow>
            <PanelRow>
                <TextControlWithUnit
                    label={__("border width", "chatrix")}
                    value={attributes.borderWidth.value}
                    unit={attributes.borderWidth.unit}
                    onChange={(value) => {
                        setAttributes({ borderWidth: { value: value, unit: "px" } });
                    }}
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
                <TextControlWithUnit
                    label={__("border radius", "chatrix")}
                    value={attributes.borderRadius.value}
                    unit={attributes.borderRadius.unit}
                    onChange={(value) => {
                        setAttributes({ borderRadius: { value: value, unit: "px" } });
                    }}
                />
            </PanelRow>
        </PanelBody>
    );
}
