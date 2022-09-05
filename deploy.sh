set -e

npm run build

cd docs/.vuepress/dist

git init 

git add -A
git commit -m'deploy'

git push -f git@github.com:karry-liao/studyblog.github.io.git master

cd -

rm -rf public