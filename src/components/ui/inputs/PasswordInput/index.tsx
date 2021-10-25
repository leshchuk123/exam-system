import React, { FC, ReactElement } from "react";

import TextInput from "../TextInput";

import { InputProps } from "../TextInput";

const EmailInput: FC<InputProps> = (props): ReactElement => {
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

export default EmailInput;