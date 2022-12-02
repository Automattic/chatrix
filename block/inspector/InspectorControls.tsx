import { InspectorControls as BaseInspectorControls } from "@wordpress/block-editor";
import { WPElement } from "@wordpress/element";
import HomeserverPanel from "./HomeserverPanel";
import RoomPanel from "./RoomPanel";
import StylePanel from "./StylePanel";

export default function InspectorControls({ attributes, setAttributes }): WPElement {
    return (
        <BaseInspectorControls>
            <div className={"chatrix-inspector-controls"}>
                <HomeserverPanel attributes={attributes} setAttributes={setAttributes}/>
                <RoomPanel attributes={attributes} setAttributes={setAttributes}/>
                <StylePanel attributes={attributes} setAttributes={setAttributes}/>
            </div>
        </BaseInspectorControls>
    );
}
