#!/usr/bin/env bash

# -e exit on error
# -v verbose
set -ev

# Decrypt the credentials we added to the repo using the key we added with the Travis command line tool
openssl aes-256-cbc -K $encrypted_4912ff11cfe7_key -iv $encrypted_4912ff11cfe7_iv -in $TRAVIS_BUILD_DIR/.travis-scripts/client-secret.json.enc -out $HOME/client-secret.json -d
# Here we use the decrypted service account credentials to authenticate the command line tool
gcloud auth activate-service-account --key-file $HOME/client-secret.json
