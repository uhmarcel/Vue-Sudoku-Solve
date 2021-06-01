#!/usr/bin/env sh

set -e

npm run build
cd dist

echo 'sudoku.marcelriera.com' > CNAME

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:uhmarcel/Vue-Sudoku-Solve.git master:gh-pages

cd -