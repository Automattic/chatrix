import { BlockConfiguration, registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";
import Edit from "./edit";
import './style.scss';

const name: string = metadata.name;
const configuration: BlockConfiguration = {
    title: "Chatrix",
    description: __("A Gutenberg block to embed a Matrix client.", "chatrix"),
    category: "text",
    attributes: {},
    edit: Edit,
};

registerBlockType(name, configuration);
