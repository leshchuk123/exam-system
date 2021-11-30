import { FC, ReactElement } from "react";

import TextInput from "../TextInput";

import { InputProps } from "../TextInput";

const EmailInput: FC<InputProps> = (props): ReactElement => {
    const {label = "Email", fieldName} = props;
    const addProps: InputProps = {
        type: "email",
        maskOptions: {
            mask: /^\S*@?\S*$/,
            lazy: false,
        },
        regEx: /^\S*@?\S*$/,
        label,
        fieldName
    }

    return <TextInput 
        { ...props} {...addProps } 
    />
}

export default EmailInput;