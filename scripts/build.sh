#!/usr/bin/env bash

# Builds both chatrix itself and the wordpress plugin.

# Build chatrix
yarn install
yarn build

# Copy chatrix assets to wordpress plugin.
rm -rf wordpress/chatrix/frontend
cp -r target wordpress/chatrix/frontend

# Generate wordpress plugin's readme.txt
php wordpress/chatrix/bin/transform-readme.php
