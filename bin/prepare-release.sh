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

CURRENT_BRANCH=$(git rev-parse --symbolic-full-name --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
  error "You must be on branch main"
fi

git checkout main
git fetch
git pull --no-rebase origin main

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

git commit -m "Release v$VERSION"
git tag "v$VERSION"
git push --tags origin main
