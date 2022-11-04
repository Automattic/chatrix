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

## Releasing
Chatrix releases are automatically created through a GitHub Action, which is executed whenever a tag of the form `vX.Y.Z` is pushed. You can create and push a tag with:

```shell
# Make sure you consider https://semver.org to decide which version you're issuing.
# Note the version must not be prefixed with a "v", e.g. it should be 1.2.3, not v1.2.3.  
bin/prepare-release.sh 1.2.3
```

Running the above script will trigger the [GitHub Action](https://github.com/Automattic/chatrix/actions), which when completed will have created a **draft release** for the tag that was pushed. You should then edit that release to provide a meaningful title and description (ideally including a [changelog](https://keepachangelog.com/en/1.0.0/)), then publish the release through the GitHub UI.
