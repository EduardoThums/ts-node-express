#!/usr/bin/env bash

rm --recursive dist
npm run build
# TODO: use esbuild-plugin-copy instead for a more dynamic approach
cp --recursive --verbose ./config ./dist
