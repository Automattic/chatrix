default: vendor node_modules build build-block

vendor: composer.json composer.lock
	composer install

node_modules: package.json yarn.lock
	yarn install

build: frontend
	yarn build:popup
	yarn build:block

build-block: block
	yarn build:block-internal
