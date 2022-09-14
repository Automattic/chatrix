# Contributing

## Running locally
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

## Releasing
Chatrix releases are automatically created through a GitHub Action, which is executed whenever a tag of the form `vX.Y.Z` is pushed. You can create and push a tag as follows.

First find the latest tag:

```shell
# Fetch tags from origin
git fetch

# Returns the latest tag, e.g. v0.1.0
git describe --tags --abbrev=0
```

Then create and push a tag that increments the latest one as per [Semantic Versioning](https://semver.org/):

```shell
git tag v0.1.1
git push origin v0.1.1
```

The [GitHub Action](https://github.com/Automattic/chatrix/actions) will launch automatically, and when completed will have created a **draft release** for the tag that was pushed. You should then edit that release to provide a meaningful title and description (ideally including a [changelog](https://keepachangelog.com/en/1.0.0/)), then publish the release.
