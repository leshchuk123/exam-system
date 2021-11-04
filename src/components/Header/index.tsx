import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { IDataUser } from "../../interfaces/data";
import { signOut } from "../../reducers/actions/auth";
import { AppDispatch, RootState } from "../../store";

import Button from "../ui/Button";

import "./header.scss";

const mapState = (state: RootState) => {
    const user = state.user.data as IDataUser | undefined;
    return { user };
};
const mapDispatch = (dispatch: AppDispatch) => {
    return {
        signout: (uid: string) => signOut(uid, dispatch),
    }
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Header: FC<PropsFromRedux> = ({ user, signout }): JSX.Element => {
    return <div className="header">
        <div className="title">
            <div className="title_text">
                Exams System
            </div>
        </div>
        <div className="menu">
            {!!user?.userUid && <>
                <div className="title_username">{`${user.firstName} ${user.lastName}`}</div>
                <Button icon="sign-out" onClick={() => signout(String(user.userUid))} />
            </>}
        </div>
    </div>
};

export default connector(Header);