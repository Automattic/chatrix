import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig(() => {
    return {
        base: "",
        root: __dirname,
        envDir: __dirname,
        build: {
            outDir: resolve(__dirname, "../build/"),
            lib: {
                entry: resolve(__dirname, `./logout.ts`),
                formats: ["iife"],
                name: "ChatrixLogout",
                fileName: "logout"
            },
            rollupOptions: {}
        }
    };
});
