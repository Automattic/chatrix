import { defineConfig } from "vite";
import { resolve } from "path";
import manifest from "../../../package.json";

export default defineConfig(() => {
    return {
        base: "",
        root: __dirname,
        envDir: "../../",
        define: {
            DEFINE_VERSION: JSON.stringify(manifest.version),
            DEFINE_GLOBAL_HASH: JSON.stringify(null),
        },
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
