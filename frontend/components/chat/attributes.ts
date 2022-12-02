export interface Attributes {
    defaultHomeserver?: string,
    roomId?: string,
    height: Height,
    borderWidth: BorderWidth,
    borderRadius: BorderRadius,
    borderStyle: string,
    borderColor: string,
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
