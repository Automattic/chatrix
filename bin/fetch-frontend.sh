#!/usr/bin/env bash

VERSION="v0.2.1"

set -e

RELEASE_URL="https://api.github.com/repos/Automattic/chatrix-frontend/releases/tags/$VERSION"
ARTIFACT_URL=$(curl -s $RELEASE_URL | grep browser_download_url | cut -d '"' -f 4)
FILENAME=${ARTIFACT_URL##*/}

echo "Downloading $ARTIFACT_URL..."
curl -L "$ARTIFACT_URL" --output "$FILENAME" --progress-bar

echo "Extracting $FILENAME..."
rm -rf frontend
mkdir frontend
tar -xvzf "$FILENAME" -C frontend --strip-components=1

rm "$FILENAME"
