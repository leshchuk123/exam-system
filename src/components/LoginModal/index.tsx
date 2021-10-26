import React, { FC, ReactElement, useEffect, useState } from "react";
// import { useDispatch } from "react-redux";

import Modal from "../Modal";
import Logo from "../ui/Logo";
import Button, {BTN_TYPE} from "../ui/Button";
import EmailInput from "../ui/inputs/EmailInput";
import PasswordInput from "../ui/inputs/PasswordInput";
import { IValidator } from "../ui/inputs/TextInput";

// import { setUser } from "../../app/reducers/user";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { authUserThunk } from "../../app/thunks/user";
import { auth } from "../../reducers/user";

export interface ILoginModal {
    open?: boolean
}

const LoginModal:FC<ILoginModal> = (props): ReactElement => {
    const { open } = props;

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [valid, setValid] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);
    console.log(Date.now(), 2, user)

    useEffect(() => {
        console.log(Date.now(), 4, user)
        debugger
    }, [user]);

    const submit = async () => {
        if (valid) {
            // dispatch(auth(email, password))
        }
    }

    const validator: IValidator = ({ valid, name, dirty, value}) => {
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
        <div className="modal_footer">
            <Button 
                text="Submit" 
                type={BTN_TYPE.PRIMARY} 
                disabled={!valid} 
                onClick={submit} />
        </div>
    </Modal>
}

// const mapDispatchToProps = dispatch: AppDispatch => {
//     return {
//         doAuth: (email, password) => dispatch(auth(email, password))
//     }
// }
export default LoginModal;