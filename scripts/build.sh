#!/usr/bin/env bash

# Generate wordpress plugin's readme.txt
php wordpress/chatrix/bin/transform-readme.php

# Install composer dependencies
cd wordpress/chatrix || exit 1
composer install --no-ansi --no-dev --no-interaction --no-plugins --no-scripts --optimize-autoloader
