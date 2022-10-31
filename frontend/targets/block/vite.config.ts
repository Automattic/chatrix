import { defineConfig } from "vite";
import { defaultViteConfig } from "../../build/vite";

export default defineConfig(() => {
    return {
        ...defaultViteConfig(__dirname, "block"),
        ...{
            // If needed, you can override values from the default config here.
        }
    };
});
