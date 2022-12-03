import { resolve } from "path";
import { defineConfig } from "vite";
import { defaultParentConfig } from "../../build/vite-parent";

// @ts-ignore
export default defineConfig(() => {
    return {
        ...defaultParentConfig(resolve(__dirname, "../../"), "popup"),
        ...{
            // If needed, you can override values from the default config here.
        }
    };
});
