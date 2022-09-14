# Running WordPress plugin locally

Install composer dependencies:

```shell
cd wordpress/chatrix
composer install
```

You'll need [wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/). If you don't
have it installed, you can install it with:

```shell
npm -g i @wordpress/env
```

Once `wp-env` is installed you can use it to start WordPress with:

```shell
cd wordpress
wp-env start
```

You can access WordPress's admin at [`http://localhost:8888/wp-admin`](http://localhost:8888/wp-admin). The credentials
are:

- username: **`admin`**
- password: **`password`**

## Linting

Change to the plugin directory:

```shell
cd wordpress/chatrix
```

Then run `phpcs`:

```shell
./vendor/bin/phpcs
```
