#!/usr/bin/env bash

# -e exit on error
# -v verbose
set -ev

# If the SDK is not already cached, download it and unpack it
if [ ! -d ${HOME}/google-cloud-sdk/bin ]; then
    rm -rf $HOME/google-cloud-sdk;
    curl https://sdk.cloud.google.com | bash > /dev/null;
fi
