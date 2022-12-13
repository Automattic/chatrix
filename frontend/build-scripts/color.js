/*
Copyright 2021 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import * as pkg from 'off-color';

const offColor = pkg.offColor ?? pkg.default.offColor;

export function derive(value, operation, argument, isDark) {
    const argumentAsNumber = parseInt(argument);
    if (isDark) {
        // For dark themes, invert the operation
        if (operation === 'darker') {
            operation = "lighter";
        }
        else if (operation === 'lighter') {
            operation = "darker";
        }
    }
    switch (operation) {
        case "darker": {
            return offColor(value).darken(argumentAsNumber / 100).hex();
        }
        case "lighter": {
            return offColor(value).lighten(argumentAsNumber / 100).hex();
        }
        case "alpha": {
            return offColor(value).rgba(argumentAsNumber / 100);
        }
    }
}
