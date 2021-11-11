import { FC, useEffect, useState } from "react";

import Modal from "../Modal";
import Button, {BTN_SIZE, BTN_TYPE} from "../ui/Button";
import EmailInput from "../ui/inputs/EmailInput";
import PasswordInput from "../ui/inputs/PasswordInput";
import { IValidator } from "../ui/inputs/TextInput";

import { auth } from "../../reducers/actions/auth";
import { AppDispatch } from "../../store";
import { connect } from "react-redux";
import Brand from "../Brand";

export interface OwnProps {
    open?: boolean
    error?: string
}

interface DispatchProps {
    doAuth: (email: string, password: string) => void
}
 
type Props =  DispatchProps & OwnProps;

const LoginModal:FC<Props> = (props): JSX.Element => {
    const {
        open = false,
        error = "",
        doAuth
    } = props;

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [valid, setValid] = useState<boolean>(false);

    const doSubmit = () => {
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

    return <Modal open={open} closable={false} style={{width: 600, height: 400}}>
        <div className="modal_header">
            <Brand />
        </div>
        <div className="modal_body">
            <div className="modal_content">
                <form autoComplete="off">
                    <EmailInput 
                        fieldName="email" 
                        validator={validator} 
                        onEnter={doSubmit} />
                    <PasswordInput 
                        fieldName="password" 
                        validator={validator} 
                        onEnter={doSubmit} />
                </form>
            </div>
        </div>
        {error.length > 0 && <div className="modal_error_message">{error}</div>}
        <div className="modal_footer">
            <Button 
                text="Submit" 
                type={BTN_TYPE.PRIMARY}
                size={BTN_SIZE.LG}
                disabled={!valid} 
                onClick={doSubmit} />
        </div>
    </Modal>
}

const mapDispatch = (dispatch: AppDispatch) => {
    return {
        doAuth: (email:string, password: string) => auth(email, password, dispatch),
    }
}
export default connect<null, DispatchProps, OwnProps>(null, mapDispatch)(LoginModal);