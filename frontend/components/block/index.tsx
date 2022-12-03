declare global {
    interface Window {
        automattic_chatrix_block_config: {
            rootUrl: string;
        };
    }
}

export { Block, type BlockProps } from "./block";
export { parseAttributes, type Attributes, Unit, Height, BorderWidth, BorderRadius } from "./attributes";
