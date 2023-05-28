#!/bin/bash
componentName=$1

# no empty component name
if [ -z "$componentName" ]
then
  echo "Component name is required"
  exit 1
fi

# check if component exists
if [ ! -d "packages/components/$componentName" ]
then
  echo "Component does not exist"
  exit 1
fi

# cd to the component directory
cd packages/components/$componentName
pnpm build

# publish
pnpm publish --access public --no-git-checks