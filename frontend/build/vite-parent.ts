import { resolve } from "path";

export function defaultParentConfig(rootDir: string, targetName: string) {
    return {
        base: "",
        root: rootDir,
        envDir: __dirname,
        build: {
            outDir: resolve(__dirname, `../../build/frontend/${targetName}`),
            lib: {
                entry: resolve(__dirname, `../targets/${targetName}/parent.ts`),
                formats: ["iife"],
                name: "AutomatticChatrix",
                fileName: "parent"
            },
            rollupOptions: {}
        }
    };
}
