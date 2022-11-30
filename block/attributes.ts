interface Attributes {
    defaultHomeserver?: string,
    roomId?: string,
    height: Height,
    border: {
        width: BorderWidth,
        radius: BorderRadius,
        style: string,
        color: string,
    }
}

export function parseAttributes(attributes): Attributes {
    return {
        defaultHomeserver: attributes.defaultHomeserver ?? '',
        roomId: attributes.roomId ?? '',
        height: new Height(attributes.height.value, attributes.height.unit),
        border: {
            width: new BorderWidth(attributes.border.width.value, attributes.border.width.unit),
            radius: new BorderRadius(attributes.border.radius.value, attributes.border.radius.unit),
            style: attributes.border.style,
            color: attributes.border.color,
        }
    };
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
    private readonly value: number;
    private readonly unit?: Unit;

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
}

export class BorderRadius extends ValueWithUnit {
    constructor(value: number, unit: Unit | string) {
        super(value, unit);
    }
}
