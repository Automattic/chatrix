export enum Unit {
    px = "px",
    "%" = "%",
    em = "em",
    rem = "rem",
}

export class ValueWithUnit {
    protected readonly value: number;
    protected readonly unit?: Unit;

    constructor(value: number | string, unit: Unit | string) {
        if (typeof value === "string") {
            this.value = +value;
        } else {
            this.value = value;
        }

        if (typeof unit === "string") {
            this.unit = Unit[unit];
        } else {
            this.unit = unit;
        }
    }

    public toString(): string {
        return this.value && this.unit ? `${this.value}${this.unit}` : '';
    }
}
