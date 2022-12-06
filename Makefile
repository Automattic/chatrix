default: vendor node_modules build/frontend build/block

vendor: composer.json composer.lock
	composer install

node_modules: package.json yarn.lock
	yarn install

build/frontend: frontend
	yarn build

build/block: frontend/block
	yarn build:block
