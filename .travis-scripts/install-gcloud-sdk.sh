#!/usr/bin/env bash

# -e exit on error
# -v verbose
set -ev

# If the SDK is not already cached, download it and unpack it
if [ ! -d $GOOGLE_CLOUD_SDK/bin ]; then
    rm -rf $GOOGLE_CLOUD_SDK;
    curl https://sdk.cloud.google.com | bash > /dev/null;
fi
