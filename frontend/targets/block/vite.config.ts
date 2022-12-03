import { resolve } from "path";
import { defineConfig } from "vite";
import { defaultConfig } from "../../build/vite";

export default defineConfig(({mode}) => {
    return {
        ...defaultConfig(mode, resolve(__dirname, "../../"), "block"),
        ...{
            // If needed, you can override values from the default config here.
        }
    };
});
