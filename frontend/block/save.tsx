import { useBlockProps } from "@wordpress/block-editor";
import { parseAttributes } from "../components/block";

interface Props {
    attributes: object,
}

export default function Save(props: Props) {
    const attributes = parseAttributes(props.attributes);

    const blockProps = {
        "data-default-homeserver": encodeURIComponent(attributes.defaultHomeserver ?? ""),
        "data-room-id": encodeURIComponent(attributes.roomId ?? ""),
        "data-height": encodeURIComponent(attributes.height ? attributes.height.toString() : ''),
        "data-border-width": encodeURIComponent(attributes.borderWidth ? attributes.borderWidth.toString() : ''),
        "data-border-radius": encodeURIComponent(attributes.borderRadius ? attributes.borderRadius.toString() : ''),
        "data-border-style": encodeURIComponent(attributes.borderStyle ?? ''),
        "data-border-color": encodeURIComponent(attributes.borderColor ?? ''),
    };

    return (
        <div {...useBlockProps.save()}>
            <span {...blockProps} hidden></span>
        </div>
    );
}
