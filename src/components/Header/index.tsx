import { FC, useContext } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppContext } from "../../app/App";
import { signOut } from "../../reducers/actions/auth";
import { AppDispatch } from "../../store";
import Button from "../ui/Button";

import "./header.scss";

const mapDispatch = (dispatch: AppDispatch) => {
    return {
        signout: (uid: string) => signOut(uid, dispatch),
    }
}

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Header: FC<PropsFromRedux> = ({ signout }): JSX.Element => {
    const { user } = useContext(AppContext);

    return <div className="header">
        <div className="title">
            <div className="title_text">
                Exams System
            </div>
        </div>
        <div className="menu">
            {!!user?.userUid && <>
                <div className="title_username">{`${user.name} ${user.surname}`}</div>
                <Button icon="sign-out" onClick={() => signout(String(user.userUid))} />
            </>}
        </div>
    </div>
};

export default connector(Header);