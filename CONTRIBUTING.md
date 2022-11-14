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
Issuing a new release is a semi-automated process which consists of the following steps:

1. In your local machine, run the `bin/prepare-release.sh` script, which creates a Pull Request where a release can be prepared.
2. Once the above PR is merged, a GitHub Action will be triggered which will create a release on GitHub.
3. Once a release is created on GitHub, a GitHub Action will be triggered which will publish the release to the WordPress Plugin Directory.

### Preparing a release

> You'll need [`jq`](https://stedolan.github.io/jq), which on macOS can be installed with `brew install jq`.

> You'll need the [GitHub CLI](https://cli.github.com), which on macOS can be installed with `brew install gh`.

You can prepare a release with the following command (using `v1.2.3` as example):

> Make sure to consider [Semantic Versioning](https://semver.org) to decide which version you're issuing.


```shell
bin/prepare-release.sh 1.2.3
```

Running the above script will create the Pull Request where a release can be prepared. Once the PR is merged, a GitHub Action will be triggered which will create the release.
