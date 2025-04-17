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
This section documents the process for issuing a new release.

### Create a PR for the release

> You'll need [`jq`](https://stedolan.github.io/jq), which on macOS can be installed with `brew install jq`.

> You'll need the [GitHub CLI](https://cli.github.com), which on macOS can be installed with `brew install gh`.

> You'll also need to login to the GitHub CLI with `gh auth login`, if you haven't already.

You can prepare a release with the following command (using `v1.2.3` as example):

> Make sure to consider [Semantic Versioning](https://semver.org) to decide which version you're issuing.

```shell
bin/prepare-release.sh 1.2.3
```

A new draft PR will now have been created, and its branch checked out locally.

### Test the release
You can use [`wp-env`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) to run a local WordPress instance with the plugin installed:

```shell
yarn build
wp-env start
```

In your browser, navigate to the URL that `wp-env` wrote to the terminal and make sure that the plugin is working as expected.

### Add a Changelog
A Changelog must be added to the `Changelog` section of `README.md`. In the PR description, you can find a link to all the commits since the previous release. You should manually go through the list and identify merged PRs that should be included in the Changelog (i.e. PRs that result in user-facing changes).

You should push a commit with the new Changelog entry to the release branch, and then copy the Changelog to the PR description as well.

### Merge the PR
Once you're satisfied with the release, you can merge the PR. The PR will be merged into the `main` branch, and a GitHub Action will be triggered which will create a **draft** release on GitHub.

### Publish the release
Copy the Changelog entry from the PR description (or `README.md`) into the release description,
then publish the release.
Publishing the release will trigger a GitHub Action which will push the release to the WordPress Plugin Directory.
Check your email for the link or head over to [https://wordpress.org/plugins/developers/releases/](https://wordpress.org/plugins/developers/releases/)
to confirm the release.

Go to the [plugin directory page](https://wordpress.org/plugins/chatrix/) and make sure the new version is available. This might take up to a few minutes.

### Done
The release has been published to both GitHub and the WordPress Plugin Directory. You can now delete the release branch from your local machine.
