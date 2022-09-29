import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(() => {
    return {
        base: "",
        root: __dirname,
        build: {
            rollupOptions: {
                input: {
                    app: resolve(__dirname, "app.html"),
                    parent: resolve(__dirname, "index.html"),
                },
            },
            outDir: "../../../build/block",
            target: "esnext",
            assetsInlineLimit: 0,
            manifest: true,
            emptyOutDir: true,
        },
    };
});
