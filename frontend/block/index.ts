import { BlockConfiguration, registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";
import Edit from "./edit";
import './style.scss';

const name: string = metadata.name;
const configuration: BlockConfiguration = {
    title: metadata.title,
    description: __("Matrix client", "chatrix"),
    category: metadata.category,
    attributes: metadata.attributes,
    edit: Edit,
};

registerBlockType(name, configuration);
