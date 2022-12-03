import { resolve } from "path";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig(() => {
    return {
        base: "",
        root: __dirname,
        envDir: __dirname,
        build: {
            outDir: resolve(__dirname, "../build/"),
            lib: {
                entry: resolve(__dirname, `./index.ts`),
                formats: ["iife"],
                name: "AutomatticChatrix",
                fileName: "index"
            },
            rollupOptions: {}
        },
        plugins: [
            cssInjectedByJsPlugin(),
        ]
    };
});
