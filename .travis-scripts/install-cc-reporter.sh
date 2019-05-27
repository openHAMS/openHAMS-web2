#!/usr/bin/env bash

# -e exit on error
# -v verbose
set -ev

# install codeclimate reporter
curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > $TEST_REPORTER
chmod +x $TEST_REPORTER
