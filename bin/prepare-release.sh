set -e

function error {
  RED='\033[0;31m'
  NONE='\033[0m'
  printf "$RED$1$NONE\n"
  exit 1
}

if [ -z "$1" ]; then
    error "Provide a new version, current version is $(jq '.version' package.json)"
fi

VERSION=$1
RELEASE_BRANCH="release-$VERSION"

CURRENT_BRANCH=$(git rev-parse --symbolic-full-name --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
  error "You must be on branch main"
fi

# Make sure we're up-to-date with origin.
git fetch
git pull --no-rebase origin main

# Checkout or create branch for release.
if [[ $(git branch --list "$RELEASE_BRANCH") ]]
then
  git checkout "$RELEASE_BRANCH"
else
  git checkout -b "$RELEASE_BRANCH"
fi

for file in package.json composer.json block/block.json
do
  jq ".version = \"$VERSION\"" $file > $file.tmp
  mv $file.tmp $file
  git add $file
done

sed -i"" -e "s/\(Version: \)\(.*\)/\1$VERSION/g" chatrix.php
sed -i"" -e "s/\(\$version = '\)\(.*\)/\1$VERSION';/g" chatrix.php
sed -i"" -e "s/\(- Stable tag: \)\(.*\)/\1$VERSION/g" README.md
rm -f chatrix.php-e README.md-e
git add chatrix.php README.md

git --no-pager diff --cached

printf "\n\n"
read -p "Would you like to commit and push the above diff to the $RELEASE_BRANCH branch? [y|n] " yn
case $yn in
	yes|y ) ;;
	* )
	  error "Exiting without committing."
esac

git commit -m "Release v$VERSION"
git push origin "$RELEASE_BRANCH"
