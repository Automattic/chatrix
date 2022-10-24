set -e

if [ -z "$1" ]; then
    echo "Provide a new version, current version is $(jq '.version' package.json)"
    exit 1
fi

VERSION=$1

git checkout main
git fetch
git pull origin main

for file in package.json composer.json block/block.json
do
  jq ".version = \"$VERSION\"" $file > $file.tmp
  mv $file.tmp $file
  git add $file
done

sed -i"" -e "s/\(Version: \)\(.*\)/\1$VERSION/g" chatrix.php
sed -i"" -e "s/\(AUTOMATTIC_CHATRIX_VERSION = '\)\(.*\)/\1$VERSION';/g" chatrix.php
rm -f chatrix.php-e
git add chatrix.php

git commit -m "Release v$VERSION"
git tag "v$VERSION"
git push --tags origin main
