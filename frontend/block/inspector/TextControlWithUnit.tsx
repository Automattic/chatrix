import { BaseControl } from "@wordpress/components";
import { useInstanceId } from "@wordpress/compose";
import { forwardRef, useState } from "@wordpress/element";
import type { ChangeEvent, FormEvent, ForwardedRef } from 'react';
import { Unit } from "../../components/block";

interface Props {
    value: number
    unit: string
    onChange: (value: number, unit: string) => any
    label: string
    help?: string
}

interface State {
    value: number;
    unit: string;
}

export const TextControlWithUnit = forwardRef(UnforwardedTextControlWithUnit);
export default TextControlWithUnit;

function UnforwardedTextControlWithUnit(props: Props, ref: ForwardedRef<HTMLInputElement>) {
    const instanceId = useInstanceId(TextControlWithUnit);
    const id = `inspector-text-control-${instanceId}`;
    const units = Object.values(Unit);

    const [state, setState] = useState<State>({
        value: props.value,
        unit: props.unit,
    });

    if (props !== state) {
        setState(props);
    }

    const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const value = +target.value;
        setState({
            ...state,
            value: value,
        });
        props.onChange(value, state.unit);
    };

    const onChangeUnit = (event: FormEvent<HTMLSelectElement>) => {
        const target = event.target as HTMLSelectElement;
        const unit = target.value;
        setState({
            ...state,
            unit: unit,
        });
        props.onChange(state.value, unit);
    };

    return (
        <div className={"chatrix-text-control-with-unit"}>
            <BaseControl
                label={props.label}
                id={id}
                help={props.help}
            >
                <span>
                    <input
                        className="components-text-control__input"
                        type={"text"}
                        id={id}
                        value={state.value}
                        onChange={onChangeValue}
                        aria-describedby={!!props.help ? id + '__help' : undefined}
                        ref={ref}
                    />
                    <select value={state.unit} onChange={onChangeUnit}>
                        {units.map(unit => <option value={unit} key={unit}>{unit}</option>)}
                    </select>
                </span>
            </BaseControl>
        </div>
    );
}
