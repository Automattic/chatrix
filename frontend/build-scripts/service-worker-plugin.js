const path = require("path");
const xxhash = require("xxhashjs");

function contentHash(str) {
    const hasher = new xxhash.h32(0);
    hasher.update(str);
    return hasher.digest();
}

function injectServiceWorker(swFile, findUnhashedFileNamesFromBundle, placeholdersPerChunk) {
    const swName = path.basename(swFile);
    let version;
    let logger;

    return {
        name: "chatrix:inject-service-worker",
        apply: "build",
        enforce: "post",
        buildStart() {
            this.emitFile({
                type: "chunk",
                fileName: swName,
                id: swFile,
            });
        },
        configResolved(config) {
            version = JSON.parse(config.define.DEFINE_VERSION);
            logger = config.logger;
        },
        generateBundle(_options, bundle) {
            const otherUnhashedFiles = findUnhashedFileNamesFromBundle(bundle);
            const unhashedFilenames = [swName].concat(otherUnhashedFiles);
            const unhashedFileContentMap = unhashedFilenames.reduce((map, fileName) => {
                const chunkOrAsset = bundle[fileName];
                if (!chunkOrAsset) {
                    throw new Error("could not get content for uncached asset or chunk " + fileName);
                }
                map[fileName] = chunkOrAsset.source || chunkOrAsset.code;
                return map;
            }, {});
            const assets = Object.values(bundle);
            const hashedFileNames = assets.map((o) => o.fileName).filter((fileName) => !unhashedFileContentMap[fileName]);
            const globalHash = getBuildHash(hashedFileNames, unhashedFileContentMap);
            const placeholderValues = {
                DEFINE_GLOBAL_HASH: `"${globalHash}"`,
                ...getCacheFileNamePlaceholderValues(swName, unhashedFilenames, assets)
            };
            replacePlaceholdersInChunks(assets, placeholdersPerChunk, placeholderValues);
            logger.info(`\nBuilt ${version} (${globalHash})`);
        }
    };
}

function getBuildHash(hashedFileNames, unhashedFileContentMap) {
    const unhashedHashes = Object.entries(unhashedFileContentMap).map(([fileName, content]) => {
        return `${fileName}-${contentHash(Buffer.from(content))}`;
    });
    const globalHashAssets = hashedFileNames.concat(unhashedHashes);
    globalHashAssets.sort();
    return contentHash(globalHashAssets.join(",")).toString();
}

const NON_PRECACHED_JS = [
    "hydrogen-legacy",
    "olm_legacy.js",
    "main.js"
];

function getBundleName(asset) {
    return asset.name || asset.names?.[0] || asset.originalFileNames?.[0] || asset.fileName || "";
}

function isPreCached(asset) {
    const name = getBundleName(asset);
    const { fileName } = asset;

    if (!name && fileName.includes("sync-worker")) {
        if (fileName.endsWith(".js.map")) {
            return false;
        }

        if (fileName.endsWith(".js")) {
            return false;
        }
    }

    return  name.endsWith(".svg") ||
            name.endsWith(".png") ||
            name.endsWith(".css") ||
            name.endsWith(".wasm") ||
            name.endsWith(".html") ||
            fileName.endsWith(".js") && !NON_PRECACHED_JS.includes(path.basename(name));
}

function getCacheFileNamePlaceholderValues(swName, unhashedFilenames, assets) {
    const unhashedPreCachedAssets = [];
    const hashedPreCachedAssets = [];
    const hashedCachedOnRequestAssets = [];

    for (const asset of assets) {
        const { fileName } = asset;
        if (fileName === swName) {
            continue;
        } else if (unhashedFilenames.includes(fileName)) {
            unhashedPreCachedAssets.push(fileName);
        } else if (isPreCached(asset)) {
            hashedPreCachedAssets.push(fileName);
        } else {
            hashedCachedOnRequestAssets.push(fileName);
        }
    }

    return {
        DEFINE_UNHASHED_PRECACHED_ASSETS: JSON.stringify(unhashedPreCachedAssets),
        DEFINE_HASHED_PRECACHED_ASSETS: JSON.stringify(hashedPreCachedAssets),
        DEFINE_HASHED_CACHED_ON_REQUEST_ASSETS: JSON.stringify(hashedCachedOnRequestAssets)
    };
}

function replacePlaceholdersInChunks(assets, placeholdersPerChunk, placeholderValues) {
    for (const [name, placeholderMap] of Object.entries(placeholdersPerChunk)) {
        const chunk = assets.find((asset) => asset.type === "chunk" && asset.name === name);
        if (!chunk) {
            throw new Error(`could not find chunk ${name} to replace placeholders`);
        }
        for (const [placeholderName, placeholderLiteral] of Object.entries(placeholderMap)) {
            const replacedValue = placeholderValues[placeholderName];
            const oldCode = chunk.code;
            chunk.code = chunk.code.replaceAll(placeholderLiteral, replacedValue);
            if (chunk.code === oldCode) {
                throw new Error(`Could not replace ${placeholderName} in ${name}, looking for literal ${placeholderLiteral}:\n${chunk.code}`);
            }
        }
    }
}

module.exports = { injectServiceWorker };
