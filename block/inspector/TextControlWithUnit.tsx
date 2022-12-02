import { BaseControl } from "@wordpress/components";
import { useInstanceId } from "@wordpress/compose";
import { forwardRef } from "@wordpress/element";
import type { ChangeEvent, ForwardedRef } from 'react';

interface Props {
    value: number
    unit: string
    onChange: any
    label: string
    help?: string
}

export const TextControlWithUnit = forwardRef(UnforwardedTextControlWithUnit);
export default TextControlWithUnit;

function UnforwardedTextControlWithUnit(props: Props, ref: ForwardedRef<HTMLInputElement>) {
    const instanceId = useInstanceId(TextControlWithUnit);
    const id = `inspector-text-control-${instanceId}`;
    const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => props.onChange(event.target.value);

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
                        value={props.value}
                        onChange={onChangeValue}
                        aria-describedby={!!props.help ? id + '__help' : undefined}
                        ref={ref}
                    />
                    <span>{props.unit}</span>
                </span>
            </BaseControl>
        </div>
    );
}
