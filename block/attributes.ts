interface Attributes {
    defaultHomeserver?: string,
    roomId?: string,
    height: Height,
}

export function parseAttributes(attributes): Attributes {
    return {
        defaultHomeserver: attributes.defaultHomeserver ?? '',
        roomId: attributes.roomId ?? '',
        height: new Height(attributes.height.value, attributes.height.unit),
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

export class Height {
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
