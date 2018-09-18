#!/usr/bin/env bash

# -e exit on error
# -v verbose
set -ev

# If the SDK is not already cached, download it and unpack it
if [ ! -d ${HOME}/google-cloud-sdk/bin ]; then
    rm -rf $HOME/google-cloud-sdk;
    curl https://sdk.cloud.google.com | bash > /dev/null;
fi
# This line is critical.
# We setup the SDK to take precedence in our environment
#   over the old SDK that is already on the machine.
source $HOME/google-cloud-sdk/path.bash.inc
