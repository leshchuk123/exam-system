import { FC, useEffect, useState } from "react";

import Modal from "../Modal";
import Logo from "../ui/Logo";
import Button, {BTN_SIZE, BTN_TYPE} from "../ui/Button";
import EmailInput from "../ui/inputs/EmailInput";
import PasswordInput from "../ui/inputs/PasswordInput";
import { IValidator } from "../ui/inputs/TextInput";

import { auth } from "../../reducers/user";
import { AppDispatch } from "../../store";
import { connect } from "react-redux";

export interface OwnProps {
    open?: boolean
    error?: string
}

interface DispatchProps {
    doAuth: (email: string, password: string) => void
}
 
type Props =  DispatchProps & OwnProps;

const LoginModal:FC<Props> = (props): JSX.Element => {
    const { open, error, doAuth } = props;

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [valid, setValid] = useState<boolean>(false);

    const submit = async () => {
        if (valid) {
            const md5 = require('md5');
            doAuth(email, md5(password));
        }
    }

    const validator: IValidator = ({ valid, name, value}) => {
        if (name === "email") setEmail(valid ? String(value) : "");
        else if (name === "password") setPassword(valid ? String(value) : "");
    }

    useEffect(() => {
        setValid(!!email && !!password)
    }, [ email, password ]);

    return <Modal open={open} closable={false}>
        <div className="modal_header">
            <Logo />
        </div>
        <div className="modal_body">
            <div className="modal_content">
                <form autoComplete="off">
                    <EmailInput 
                        fieldName="email" 
                        validator={validator} 
                        onEnter={submit} />
                    <PasswordInput 
                        fieldName="password" 
                        validator={validator} 
                        onEnter={submit} />
                </form>
            </div>
        </div>
        {error?.length && <div className="modal_error_message">{error}</div>}
        <div className="modal_footer">
            <Button 
                text="Submit" 
                type={BTN_TYPE.PRIMARY}
                size={BTN_SIZE.LG}
                disabled={!valid} 
                onClick={submit} />
        </div>
    </Modal>
}

const mapDispatch = (dispatch: AppDispatch) => {
    return {
        doAuth: (email:string, password: string) => auth(email, password, dispatch),
    }
}
export default connect<null, DispatchProps, OwnProps>(null, mapDispatch)(LoginModal);