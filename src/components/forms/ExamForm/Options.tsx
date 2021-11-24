import { FC, useEffect, useRef, useState } from "react";

import { RadioButton, RadioButtonChangeParams } from 'primereact/radiobutton';
import { Checkbox, CheckboxChangeParams } from 'primereact/checkbox';
import { isEqual } from "../../../helpers/index";
import { arrAddUnique, arrRemove, isIn } from "../../../helpers/array";
import { IDataMode, IDataOption } from "../../../interfaces/data";

export interface OptionsChangeHandler {
    (index: number, result: number[], correct: boolean): void
}
interface IProps {
    index: number;
    options: IDataOption[];
    selected: number[];
    onChange: OptionsChangeHandler
    mode: IDataMode | number;
}
const Options:FC<IProps> = (props):JSX.Element => {
    const { options, index, onChange, mode } = props;
    const correct = useRef(options.filter(v => v.correct).map(v => Number(v.id)).sort());
    const [sel, setSelected] = useState<number[]>([]);

    const onControlChange = (e: RadioButtonChangeParams | CheckboxChangeParams) => {
        let result: number[];
        if (e.target.name === "radio") {
            result = [e.value];
        } else {
            result = (e.checked ? 
                arrAddUnique<number>(sel, Number(e.value)) :
                arrRemove(sel, Number(e.value))
            ).sort();
        }
        const isCorrect = isEqual(correct.current, result, false);
        setSelected(result);
        onChange(index, result, isCorrect);
    };

    useEffect(() => {
        setSelected(props.selected);
    }, [props.selected]);

    return <>
        {options.map((op, i) => {
            let field, cls;
            if (mode === 1) {
                cls = "p-field-radiobutton";
                field = <RadioButton
                    name="radio"
                    value={Number(op.id)}
                    onChange={onControlChange}
                    checked={isIn(sel, Number(op.id))}
                />
            } else if (mode === 2) {
                cls = "p-field-checkbox";
                field = <Checkbox
                    name={`check-${i}`}
                    value={Number(op.id)}
                    onChange={onControlChange}
                    checked={isIn(sel, Number(op.id))}
                />
            }
            return <div className={cls} key={`option${i}`}>
                {field}
                <label htmlFor={`option${i}`}>
                    {op.text}
                </label>
            </div>
        })}
    </>;
}

export default Options;
