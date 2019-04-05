#!/usr/bin/env sh

set -e

npm run docs:build

cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f https://${access_token}@github.com/AimonaStudio/rrreol.git master:gh-pages

cd ../..
