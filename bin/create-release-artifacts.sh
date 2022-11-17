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
if [[ $VERSION != v* ]]; then
  # Add leading v.
  VERSION="v$VERSION"
fi

RELEASE_ROOT_DIR="$(pwd)/release"
RELEASE_DIR="$RELEASE_ROOT_DIR/$VERSION"
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

# Rename release directory from version name (e.g. 1.2.3) to `chatrix` so that root directory in the artifacts is named `chatrix`.
# Then create the archives, and rename back to the versioned name (e.g. 1.2.3).
rm -rf "$RELEASE_ROOT_DIR/chatrix"
mv "$RELEASE_DIR" "$RELEASE_ROOT_DIR/chatrix"
cd "$RELEASE_ROOT_DIR"
zip -r "chatrix-$VERSION.zip" chatrix
tar -cvzf "chatrix-$VERSION.tar.gz" chatrix
mv "$RELEASE_ROOT_DIR/chatrix" "$RELEASE_DIR"
