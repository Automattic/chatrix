# Running WordPress plugin locally

You'll need [wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/). If you don't have it installed, you can install it with:

```shell
npm -g i @wordpress/env
```

Once `wp-env` is installed you can use it to start WordPress with:

> Note that you should be inside the `wordpress/` directory, not in the repo root.

```shell
wp-env start
```

You can access WordPress's admin at [`http://localhost:8888/wp-admin`](http://localhost:8888/wp-admin). The credentials are:

- username: **`admin`**
- password: **`password`**

Build chatrix itself:

```shell
yarn build
```

## Running phpcs
> You must be in the `wordpress/` directory, not in the repo root.

Install composer dependencies:

```shell
composer install
```

Then run `phpcs` with:

```shell
./vendor/bin/phpcs
```