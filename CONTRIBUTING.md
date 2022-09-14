# Running WordPress plugin locally

Initial setup:

```shell
make
```

You'll need [wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/). If you don't
have it installed, you can install it with:

```shell
npm -g i @wordpress/env
```

Once `wp-env` is installed you can use it to start WordPress with:

```shell
wp-env start
```

You can access WordPress's admin at [`http://localhost:8888/wp-admin`](http://localhost:8888/wp-admin). The credentials
are:

- username: **`admin`**
- password: **`password`**

## Linting
Run `phpcs`:

```shell
./vendor/bin/phpcs
```

## Upgrading frontend
If you wish to upgrade the version of [chatrix-frontend](https://github.com/Automattic/chatrix-frontend) used by this plugin, you can do so by editing `$VERSION` in [`bin/fetch-frontend.sh`](bin/fetch-frontend.sh). This will result in that version being used in the next release of this plugin.
