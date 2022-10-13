import themeBuilder from "hydrogen-web/scripts/build-plugins/rollup-plugin-build-themes";
import compileVariables from "hydrogen-web/scripts/postcss/css-compile-variables";
import urlProcessor from "hydrogen-web/scripts/postcss/css-url-processor";
import urlVariables from "hydrogen-web/scripts/postcss/css-url-to-variables";
import { resolve } from "path";
import flexbugsFixes from "postcss-flexbugs-fixes";
import manifest from "../../package.json";
import { derive } from "../build/color.js";
import { buildColorizedSVG as replacer } from "../build/svg-builder.js";

const compiledVariables = new Map();

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
            outDir: resolve(__dirname, `../../build/frontend/${targetName}`),
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
            themeBuilder({
                themeConfig: {
                    themes: [
                        resolve(__dirname, "../styles/theme")
                    ],
                    default: "chatrix",
                },
                compiledVariables,
            }),
        ],
    };
}
