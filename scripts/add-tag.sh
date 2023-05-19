#!/bin/bash

# get the version number from package.json 
version=$(node -p -e "require('./package.json').version")
version="v$version"
# git tag it
git tag $version

# push it
git push origin $version