import { Unit, ValueWithUnit } from "./unit";

export interface BlockAttributes {
    uuid: string,
    defaultHomeserver?: string,
    roomId?: string,
    height?: Height,
    borderWidth?: BorderWidth,
    borderRadius?: BorderRadius,
    borderStyle?: string,
    borderColor?: string,
}

export function parseAttributes(attributes): BlockAttributes {
    const {
        uuid,
        defaultHomeserver,
        roomId,
        height,
        borderWidth,
        borderRadius,
        borderStyle,
        borderColor,
    } = attributes;

    return {
        uuid,
        defaultHomeserver: defaultHomeserver ?? '',
        roomId: roomId ?? '',
        height: height ? new Height(height.value, height.unit) : undefined,
        borderWidth: borderWidth ? new BorderWidth(borderWidth.value, borderWidth.unit) : undefined,
        borderRadius: borderRadius ? new BorderRadius(borderRadius.value, borderRadius.unit) : undefined,
        borderStyle,
        borderColor,
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
