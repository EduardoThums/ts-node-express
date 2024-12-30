#!/usr/bin/env bash

set -e

rm --recursive --force dist
npm run build
# TODO: use esbuild-plugin-copy instead for a more dynamic approach
cp --recursive ./config ./dist

find ./dist
