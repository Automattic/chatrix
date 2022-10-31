import { defineConfig } from "vite";
import { defaultParentConfig } from "../../build/vite-parent";

// @ts-ignore
export default defineConfig(() => {
    return {
        ...defaultParentConfig(__dirname, "block"),
        ...{
            // If needed, you can override values from the default config here.
        }
    };
});
