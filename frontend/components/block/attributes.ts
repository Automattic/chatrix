import metadata from "../../block/block.json";

export interface Attributes {
    defaultHomeserver?: string,
    roomId?: string,
    height?: Height,
    borderWidth?: BorderWidth,
    borderRadius?: BorderRadius,
    borderStyle?: string,
    borderColor?: string,
}

export function parseAttributes(attributes): Attributes {
    let parsedAttributes = {};

    for (const key in attributes) {
        let value = attributes[key];
        if (!value) {
            continue;
        }

        if (key === "height") {
            value = new Height(attributes.height.value, attributes.height.unit);
        }

        if (key === "borderWidth") {
            value = new BorderWidth(attributes.borderWidth.value, attributes.borderWidth.unit);
        }

        if (key === "borderRadius") {
            value = new BorderRadius(attributes.borderRadius.value, attributes.borderRadius.unit);
        }

        parsedAttributes[key] = value;
    }

    return parsedAttributes;
}

export function asDataAttributes(attributes: Attributes): object {
    let dataAttributes = {};

    for (const key in attributes) {
        const value = attributes[key];
        if (!value) {
            continue;
        }

        if (value === metadata.attributes[key].default) {
            continue;
        }

        const dataKey = "data-" + camelCaseToHyphenatedCase(key);
        dataAttributes[dataKey] = value;
    }

    return dataAttributes;
}

function camelCaseToHyphenatedCase(value: string) {
    return value.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
}

export enum Unit {
    px = "px",
}

function unitFromString(value: string): Unit | undefined {
    switch (value) {
        case Unit.px:
            return Unit.px;
    }
    return undefined;
}

class ValueWithUnit {
    protected readonly value: number;
    protected readonly unit?: Unit;

    constructor(value: number, unit: Unit | string) {
        this.value = value;

        if (typeof unit === "string") {
            this.unit = unitFromString(unit);
        } else {
            this.unit = unit;
        }
    }

    public toString(): string {
        return this.value && this.unit ? `${this.value}${this.unit}` : '';
    }
}

export class Height extends ValueWithUnit {
    constructor(value: number, unit: Unit | string) {
        super(value, unit);
    }
}

export class BorderWidth extends ValueWithUnit {
    constructor(value: number, unit: Unit | string) {
        super(value, unit);
    }

    public toString(): string {
        return this.value && this.unit ? `${this.value}${this.unit}` : '0';
    }
}

export class BorderRadius extends ValueWithUnit {
    constructor(value: number, unit: Unit | string) {
        super(value, unit);
    }
}
