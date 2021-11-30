import { FC, ReactElement } from "react";

import TextInput from "../TextInput";

import { InputProps } from "../TextInput";

const PasswordInput: FC<InputProps> = (props): ReactElement => {
    const {label = "Пароль", fieldName} = props;
    const addProps: InputProps = {
        type: "password",
        regEx: /^\S*$/,
        label,
        fieldName
    }

    return <TextInput 
        { ...props } { ...addProps }
    />
}

export default PasswordInput;