#!/usr/bin/env bash

set -ex

./build.sh
(cd dist && zip -r ../lambda.zip *)
aws --profile tccc s3 cp lambda.zip s3://my-private-s3-eduardo --sse AES256
aws --profile tccc lambda update-function-code --function-name Admin --s3-bucket my-private-s3-eduardo --s3-key lambda.zip | jq '.State' -r
rm lambda.zip
