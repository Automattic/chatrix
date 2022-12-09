import { useBlockProps } from "@wordpress/block-editor";

export default function Save({ attributes }) {
    const props = {
        ...useBlockProps.save(),
        "data-attributes": encodeURIComponent(JSON.stringify(attributes)),
    };

    return <div {...props}/>;
}
