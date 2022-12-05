import { resolve } from "path";
import excludeGlobals from 'rollup-plugin-external-globals';
import { defineConfig } from "vite";
import injectCss from "vite-plugin-css-injected-by-js";

export default defineConfig(() => {
    return {
        base: "",
        root: __dirname,
        envDir: __dirname,
        build: {
            outDir: resolve(__dirname, "../build/"),
            lib: {
                entry: resolve(__dirname, `./app.ts`),
                formats: ["iife"],
                name: "Chatrix",
                fileName: "app"
            },
            rollupOptions: {}
        },
        plugins: [
            injectCss(),
            excludeGlobals({
                'react': 'React',
                'react-dom': 'ReactDOM',
            }),
        ],
    };
});
