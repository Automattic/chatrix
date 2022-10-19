import { defineConfig } from "vite";
import { defaultConfig } from "../../build/vite";

export default defineConfig(({mode}) => {
    return {
        ...defaultConfig(mode, __dirname, "popup"),
        ...{
            // If needed, you can override values from the default config here.
        }
    };
});
