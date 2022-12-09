import { useBlockProps } from "@wordpress/block-editor";
import { asDataAttributes, fromBlockAttributes } from "../components/block/attributes";

interface Props {
    attributes: object,
}

export default function Save(props: Props) {
    const attributes = fromBlockAttributes(props.attributes);

    return (
        <div {...useBlockProps.save()}>
            <span {...asDataAttributes(attributes)} hidden></span>
        </div>
    );
}
