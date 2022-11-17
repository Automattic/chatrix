#!/usr/bin/env bash

# Act allows running GitHub actions locally:
# https://github.com/nektos/act

act --secret-file .github/workflows/.secrets -e .github/workflows/payload.json "$@"
