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

export class ValueWithUnit {
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
