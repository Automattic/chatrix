#!/usr/bin/env bash

# The directory containing this file.
THIS_DIR="$(cd -P "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Move to the repo root.
cd "$THIS_DIR/../" || exit 1

# Build chatrix and copy resulting assets to plugin.
yarn build
rm -rf "$THIS_DIR/chatrix/frontend"
cp -r "./target" "$THIS_DIR/chatrix/frontend"

# Generate readme.txt
php "$THIS_DIR/chatrix/bin/transform-readme.php"
