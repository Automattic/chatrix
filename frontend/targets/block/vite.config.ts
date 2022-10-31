import { defineConfig } from "vite";
import { defaultConfig } from "../../build/vite";

export default defineConfig(() => {
    return {
        ...defaultConfig(__dirname, "block"),
        ...{
            // If needed, you can override values from the default config here.
        }
    };
});
