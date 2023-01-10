import { Unit, ValueWithUnit } from "./unit";

interface Attributes {
    defaultHomeserver?: string,
    roomId?: string,
    height?: Height,
    borderWidth?: BorderWidth,
    borderRadius?: BorderRadius,
    borderStyle?: string,
    borderColor?: string,
}

export function parseAttributes(attributes): Attributes {
    return {
        defaultHomeserver: attributes.defaultHomeserver ?? '',
        roomId: attributes.roomId ?? '',
        height: attributes.height ? new Height(attributes.height.value, attributes.height.unit) : undefined,
        borderWidth: attributes.borderWidth ? new BorderWidth(attributes.borderWidth.value, attributes.borderWidth.unit) : undefined,
        borderRadius: attributes.borderRadius ? new BorderRadius(attributes.borderRadius.value, attributes.borderRadius.unit) : undefined,
        borderStyle: attributes.borderStyle,
        borderColor: attributes.borderColor,
    };
}

class Height extends ValueWithUnit {
    constructor(value: number, unit: Unit | string) {
        super(value, unit);
    }
}

class BorderWidth extends ValueWithUnit {
    constructor(value: number, unit: Unit | string) {
        super(value, unit);
    }

    public toString(): string {
        return this.value && this.unit ? `${this.value}${this.unit}` : '0';
    }
}

class BorderRadius extends ValueWithUnit {
    constructor(value: number, unit: Unit | string) {
        super(value, unit);
    }
}
