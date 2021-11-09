import { FC, useState } from "react";
import { ITask } from ".";

import { RadioButton, RadioButtonChangeParams, RadioButtonProps } from 'primereact/radiobutton';
import { Checkbox, CheckboxChangeParams, CheckboxProps } from 'primereact/checkbox';
import { arrSwitch, comparator, isIn } from "../../../helpers";

export interface OptionsChangeHandler {
    (index: number, result: number[], correct: boolean): void
}
interface IProps {
    index: number;
    task: ITask;
    onChange: OptionsChangeHandler
}
const Options:FC<IProps> = (props):JSX.Element => {
    const { task, index, onChange } = props;
    const correct = task.options.filter(v => v.correct).map(v => Number(v.id)).sort();
    const [selected, setSelected] = useState(task.selected);

    const onControlChange = (e: RadioButtonChangeParams | CheckboxChangeParams) => {
        debugger
        arrSwitch(selected, Number(e.value)).sort();
        onChange(index, selected, comparator(correct, selected));
        setSelected(selected);
    };
    
    return <>
        {task.options.map((op, i) => {
            let field, cls;
            if (task.mode === 1) {
                cls = "p-field-radiobutton";
                field = <RadioButton
                    inputId={`option${i}`}
                    name={`option`}
                    value={op.id}
                    onChange={onControlChange}
                    checked={isIn(selected, Number(op.id))}
                />
            } else {
                cls = "p-field-checkbox";
                field = <Checkbox
                    inputId={`option${i}`}
                    name={`option${i}`}
                    value={op.id}
                    onChange={onControlChange}
                    checked={isIn(selected, Number(op.id))}
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
