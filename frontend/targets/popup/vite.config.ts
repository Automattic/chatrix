import { defineConfig } from "vite";
import { defaultViteConfig } from "../vite-common";

export default defineConfig(() => {
    return {
        ...defaultViteConfig(__dirname, "popup"),
        ...{
            // If needed, you can override values from the default config here.
        }
    };
});
