import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export function defaultParentConfig(rootDir: string, targetName: string) {
    let moduleName = targetName.charAt(0).toUpperCase() + targetName.slice(1);
    moduleName = "AutomatticChatrix" + moduleName;

    return {
        base: "",
        root: rootDir,
        envDir: __dirname,
        build: {
            outDir: resolve(__dirname, `../../build/frontend/${targetName}`),
            lib: {
                entry: resolve(__dirname, `../targets/${targetName}/parent.ts`),
                formats: ["iife"],
                name: moduleName,
                fileName: "parent"
            },
            rollupOptions: {}
        },
        plugins: [
            cssInjectedByJsPlugin(),
        ]
    };
}
