#!/usr/bin/env bash

# Builds both chatrix itself and the wordpress plugin.

# Build chatrix
yarn install
yarn build

# Generate wordpress plugin's readme.txt
php wordpress/chatrix/bin/transform-readme.php

# Install composer dependencies
cd wordpress/chatrix || exit 1
composer install --no-ansi --no-dev --no-interaction --no-plugins --no-scripts --optimize-autoloader
