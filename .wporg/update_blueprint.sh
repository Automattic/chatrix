#!/usr/bin/env bash

if ! command -v jq &> /dev/null ; then
    echo "jq is not installed. Please install jq (https://jqlang.github.io/jq/) before running this script."
fi

# Get the directory of the script
script_dir="$(dirname "$(readlink -f "$0")")"

blueprint_location="$script_dir/assets/blueprints/blueprint.json"
phpsrc_location="$script_dir/blueprint_runphp_step_code.php"

jq --arg newCode "$(cat $phpsrc_location)" '.steps[] |= if .step == "runPHP" then .code = $newCode else . end' $blueprint_location > updated_blueprint.json

rm $blueprint_location
mv updated_blueprint.json $blueprint_location
