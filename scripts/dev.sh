#!/bin/bash
componentName=$1
turboDependenciesFilter=[]

if [ ! -d "packages/components/$componentName" ]
then
  echo "Component does not exist"
  exit 1
fi

dependencies=$(cat packages/components/$componentName/package.json | jq -r '.dependencies | keys[] | select(. | startswith("@oku-ui"))')

filter_arguments=""
for dependency in $dependencies
do
  if [[ "$dependency" == @oku-ui* ]] 
  then
    filter_arguments+="--filter=$dependency "
  fi
done

turbo dev $filter_arguments