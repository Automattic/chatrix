import react from '@vitejs/plugin-react';
import injectWebManifest from "hydrogen-web/scripts/build-plugins/manifest";
import { createPlaceholderValues, injectServiceWorker } from "hydrogen-web/scripts/build-plugins/service-worker";
import compileVariables from "hydrogen-web/scripts/postcss/css-compile-variables";
import urlProcessor from "hydrogen-web/scripts/postcss/css-url-processor";
import urlVariables from "hydrogen-web/scripts/postcss/css-url-to-variables";
import { resolve } from "path";
import flexbugsFixes from "postcss-flexbugs-fixes";
import { defineConfig } from "vite";
import manifest from "../package.json";
import themeBuilder from "./build-scripts/build-themes";
import { derive } from "./build-scripts/color";
import { buildColorizedSVG as replacer } from "./build-scripts/svg-builder";

const compiledVariables = new Map();

export default defineConfig(({mode}) => {
    const definePlaceholders = createPlaceholderValues(mode);

    return {
        base: "",
        root: __dirname,
        envDir: __dirname,
        define: {
            DEFINE_VERSION: JSON.stringify(manifest.version),
            ...definePlaceholders,
        },
        build: {
            outDir: resolve(__dirname, `../build/iframe`),
            rollupOptions: {
                input: {
                    iframe: resolve(__dirname, "iframe.html"),
                },
                output: {
                    assetFileNames: (asset) => {
                        if (asset.name?.match(/theme-.+\.json/)) {
                            return "assets/[name][extname]";
                        }
                        return "assets/[name].[hash][extname]";
                    }
                },
            },
            target: "esnext",
            assetsInlineLimit: 0,
            manifest: false,
            emptyOutDir: true,
        },
        css: {
            postcss: {
                plugins: [
                    compileVariables({ derive, compiledVariables }),
                    urlVariables({ compiledVariables }),
                    urlProcessor({ replacer }),
                    flexbugsFixes()
                ],
            },
        },
        plugins: [
            react(),
            themeBuilder({
                themeConfig: {
                    themes: [
                        resolve(__dirname, "./iframe/styles/theme")
                    ],
                    default: "chatrix",
                },
                compiledVariables,
            }),
            // Manifest must come before service worker so that the manifest and the icons it refers to are cached.
            injectWebManifest(resolve(__dirname, "./iframe/assets/manifest.json")),
            injectServiceWorker(
                resolve(__dirname, `./iframe/platform/sw.js`),
                findUnhashedFileNamesFromBundle,
                {
                    // Placeholders to replace at end of the build by chunk name.
                    iframe: {
                        DEFINE_GLOBAL_HASH: definePlaceholders.DEFINE_GLOBAL_HASH,
                    },
                    sw: definePlaceholders,
                }
            ),
        ],
    };
});

function findUnhashedFileNamesFromBundle(bundle) {
    const names = ["iframe.html"];
    for (const fileName of Object.keys(bundle)) {
        if (/theme-.+\.json/.test(fileName)) {
            names.push(fileName);
        }
    }
    return names;
}
