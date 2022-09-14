default: vendor frontend

vendor: composer.json composer.lock
	composer install

frontend: bin/fetch-frontend.sh
	./bin/fetch-frontend.sh
