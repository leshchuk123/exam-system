import { CSSProperties, FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Checkbox, CheckboxChangeParams } from 'primereact/checkbox';

import { ROLES } from "../../../../constants/data";

interface IProps {
    value?: number
    className?: string
    style?: CSSProperties
    onChange: (value: number) => void
}

const RolesSelector: FC<IProps> = (props): JSX.Element => {
    const {
        onChange = () => void 0,
        className = "",
        style = {},
    } = props;

    const [value, setValue] = useState<number>(0);
    const onCheckboxChange = (e: CheckboxChangeParams) => {
        // const v = e.checked ? (value | e.value) : (value ^ e.value);
        // setValue(v);
        // onChange(v);
    };
    useEffect(() => {
        setValue(props.value || 0)
    },[])

    return <fieldset className={`checkboxes ${className}`} style={style}>
        <legend>Группы</legend>
        {ROLES.map((role, i) => {
            return <div className="flex gap-10 p-field-checkbox" key={uuidv4()}>
                <Checkbox
                    inputId={`role${i}`}
                    name="role"
                    value={role.value}
                    onChange={onCheckboxChange}
                    checked={(value & role.value) > 0}
                />
                <label htmlFor={`role${i}`}>{role.text}</label>
            </div>
        })}
    </fieldset>
}

export default RolesSelector;