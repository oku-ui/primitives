#!/bin/bash

# component name
componentName=$1

# cd to the component directory
cd packages/components/$componentName
pnpm build

# publish
pnpm publish --access public --no-git-checks