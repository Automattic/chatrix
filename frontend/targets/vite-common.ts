import manifest from "../../package.json";
import { resolve } from "path";

export function defaultViteConfig(rootDir: string, targetName: string) {
    return {
        base: "",
        root: rootDir,
        envDir: resolve(__dirname, "../"),
        define: {
            DEFINE_VERSION: JSON.stringify(manifest.version),
            DEFINE_GLOBAL_HASH: JSON.stringify(null),
        },
        build: {
            outDir: resolve(__dirname, `../../build/${targetName}`),
            rollupOptions: {
                input: {
                    app: resolve(rootDir, "app.html"),
                    parent: resolve(rootDir, "index.html"),
                },
            },
            target: "esnext",
            assetsInlineLimit: 0,
            manifest: true,
            emptyOutDir: true,
        },
    };
}
