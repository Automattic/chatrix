import { Unit, ValueWithUnit } from "./unit";

export interface BlockAttributes {
    instanceId: string,
    defaultHomeserver?: string,
    roomId?: string,
    enableServiceWorker?: boolean,
    height?: Height,
    borderWidth?: BorderWidth,
    borderRadius?: BorderRadius,
    borderStyle?: string,
    borderColor?: string,
}

export function parseAttributes(attributes): BlockAttributes {
    const {
        instanceId,
        defaultHomeserver,
        roomId,
        enableServiceWorker,
        height,
        borderWidth,
        borderRadius,
        borderStyle,
        borderColor,
    } = attributes;

    return {
        instanceId,
        defaultHomeserver: defaultHomeserver ?? '',
        roomId: roomId ?? '',
        enableServiceWorker: enableServiceWorker ?? true,
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
