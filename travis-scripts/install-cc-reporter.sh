#!/usr/bin/env bash

# -e exit on error
# -v verbose
set -ev

# install codeclimate reporter
curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > ./cc-test-reporter
chmod +x ./cc-test-reporter
