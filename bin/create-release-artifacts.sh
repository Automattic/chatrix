#!/usr/bin/env bash

set -e
shopt -s extglob

function error {
  RED='\033[0;31m'
  NONE='\033[0m'
  printf "$RED$1$NONE\n"
  exit 1
}

if [ -z "$1" ]; then
    error "Provide a version, current version is $(jq '.version' package.json)"
fi

VERSION=$1
if [[ $VERSION == v* ]]; then
  # Strip leading v.
  VERSION="${VERSION:1}"
fi

RELEASE_DIR="$(pwd)/release/$VERSION"
rm -rf "$RELEASE_DIR" && mkdir -p "$RELEASE_DIR"

yarn install
yarn build

PATHS_TO_INCLUDE=(
"build"
"src"
"chatrix.php"
"LICENSE"
"README.md"
)
for path in "${PATHS_TO_INCLUDE[@]}";do
    cp -r "$path" "$RELEASE_DIR/$path"
done

rm -rf "$RELEASE_DIR/build/.tmp"

COMPOSER_VENDOR_DIR="$RELEASE_DIR/vendor" composer install --no-ansi --no-dev --no-interaction --no-plugins --no-scripts --optimize-autoloader
